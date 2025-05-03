import { Db } from "mongodb";
import { MongoCollection } from "./mongoCollection.js";
import saleCollectionValidator from "../data/validators/saleCollectionValidator.json" with { type: "json" };

export class SaleCollection implements MongoCollection {
    private db: Db;
    private collectionName: string = 'sales';

    constructor(db: Db) {
        this.db = db;
    }

    async createCollection() {
        try {
            await this.db.createCollection(this.collectionName, {
            validator: saleCollectionValidator })
            console.log("Collection 'sales' created");
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
            reference: 1
        };
        const indexOptions = {
            name: "idx_reference",
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
