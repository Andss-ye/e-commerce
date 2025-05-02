import { Db } from "mongodb";
import { MongoCollection } from "./mongoCollection.js";
import makerCollectionValidator from "../data/validators/makerCollectionValidator.json" with { type: "json" };
import makersDataDefault from "../data/default/makersDataDefault.json" with { type: "json" };

export class MakerCollection implements MongoCollection {
    private db:Db;
    private collectionName = "makers";

    constructor(db: Db) {
        this.db = db;
    }

    async createCollection() {
        try {
            await this.db.createCollection(this.collectionName, { validator: makerCollectionValidator });
            console.log("Collection 'makers' created");
        } catch (error) {
        console.error(error)
        }
    }

    async createIndexes() {
        const collection = this.db.collection("makers");
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
        const makers = this.db.collection(this.collectionName);
        try {
            let res = await makers.insertMany(makersDataDefault as any[]);
            console.log("Datos de los fabricantes insertados");
            console.log(res);
        } catch (error: any) {
            if (error.writeErrors) {
                console.error("Write Errors:", error.writeErrors);
            }
            console.error("Error:", error);
        }
    }
}
