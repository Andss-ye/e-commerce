import { MongoCollection } from "./mongoCollection.js";
import paymentMethodsCollectionValidator from "../data/validators/paymentMethodsCollectionValidator.json" with { type: "json" };
import { Db } from "mongodb";

export class PaymentMethodCollection implements MongoCollection {
  private db: Db;
  private collectionName: string = "payment_methods";

  constructor(db: Db) {
    this.db = db;
  }

  async createCollection() {
    try {
      await this.db.createCollection(this.collectionName, {
        validator: { paymentMethodsCollectionValidator },
      });
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
    return; // No data to insert in this collection
  }
}
