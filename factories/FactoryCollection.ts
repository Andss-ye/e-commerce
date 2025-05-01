import { MongoCollection } from "../collections/mongoCollection.js";

export abstract class FactoryCollection {
    abstract create(): MongoCollection;
    
    async ejecutar() {
        const collection = this.create();
        await collection.createCollection();
        await collection.createIndexes();
        await collection.insertData();
    }
}
