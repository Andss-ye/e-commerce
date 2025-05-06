import { MongoCollection } from "./mongoCollection.js";
import { Db, ObjectId } from "mongodb";
import userCollectionValidator from "../data/validators/userCollectionValidator.json" with { type: "json" };
import usersDataDefault from "../data/default/usersDataDefault.json" with { type: "json" };

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
    const collection = this.db.collection(this.collectionName);
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
    const users = this.db.collection(this.collectionName);
    try {
      const formattedUsersData = usersDataDefault.map((user) => ({
        ...user,
        _id: new ObjectId(user._id),
        register_date: new Date(user.register_date)
      }));

      const res = await users.insertMany(formattedUsersData);
      console.log("Datos del usuario insertados");
      console.log(res);
    } catch (error) {
      console.error("Error al insertar datos:", error);
    }
  }
}
