import { MongoCollection } from "../interfaces/mongoCollection.js";
import { Db } from "mongodb";
import userCollectionValidator from "../validators/userCollectionValidator.json" with { type: "json" };
import usersDataDefault from "../data/usersDataDefault.json" with { type: "json" };

export class UserCollection implements MongoCollection {
  private db: Db;
  private collectionName: string = "users";

  constructor(db: Db) {
    this.db = db;
  }

  async createCollection() {
    try {
      await this.db.createCollection(this.collectionName, {
        validator: userCollectionValidator,
      });
      console.log(
        "Collection created with validator:",
        userCollectionValidator
      );
      console.log("Collection 'users' created");
    } catch (error) {
      console.error(error);
    }
  }

  async createIndexes() {
    const collection = this.db.collection("users");
    const indexFields = {
      firstName: 1,
    };
    const indexOptions = {
      name: "idx_FirstName",
    };
    try {
      await collection.createIndex(indexFields, indexOptions);
      console.log("Index created");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async insertData() {
    const users = this.db.collection("users");
    try {
      const res = await users.insertMany(usersDataDefault);
      if (res.acknowledged) {
        console.log("Datos del usuario insertados");
        console.log(res);
      } else {
        console.error("Error: La operación insertMany no fue exitosa.");
      }
    } catch (error) {
      console.error("Error al insertar datos:", error);
    }
  }
}
