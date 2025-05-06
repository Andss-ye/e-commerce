import { MongoCollection } from "./mongoCollection.js";
import paymentMethodsCollectionValidator from "../data/validators/paymentMethodsCollectionValidator.json" with { type: "json" };
import { Db, ObjectId } from "mongodb";
import paymentMethodsDataDefault from "../data/default/payment_methodsDataDefault.json" with { type: "json" };

export class PaymentMethodCollection implements MongoCollection {
  private db: Db;
  private collectionName: string = "payment_methods";

  constructor(db: Db) {
    this.db = db;
  }

  async createCollection() {
    try {
      await this.db.createCollection(this.collectionName, {
        validator: paymentMethodsCollectionValidator }
      );
      console.log("Collection 'payment_methods' created");
    } catch (error) {
      if (error instanceof Error) {
        console.error(`${error.name}: ${error.message}`);
        console.error(error.stack);
      } else {
        console.error(error);
      }
    }
  }

  async createIndexes() {
        const collection = this.db.collection(this.collectionName);
        const indexFields = {
            code: 1
        };
        const indexOptions = {
            name: "idx_code",
        };
        try {
            await collection.createIndex(indexFields, indexOptions);
            console.log("Index created");
        } catch (error) {
            console.error("Error:", error);
        }
  }

  async insertData() {
    const paymentMethods = this.db.collection(this.collectionName);
    try {
      const formattedPaymentMethodsData = paymentMethodsDataDefault.map((paymentMethod) => ({
        ...paymentMethod,
        _id: new ObjectId(paymentMethod._id),
      }));
      let res = await paymentMethods.insertMany(formattedPaymentMethodsData);
      console.log("Datos de los métodos de pago insertados");
      console.log(res);
    } catch (error: any) {
      if (error.writeErrors) {
        console.error("Write Errors:", error.writeErrors);
      }
      console.error("Error:", error);
    }
  }
}
