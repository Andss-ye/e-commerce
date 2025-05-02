import { ProductCollection } from "../collections/ProductCollection.js";
import { Db } from "mongodb";
import { FactoryCollection } from "./FactoryCollection.js";
import { MongoCollection } from "../collections/mongoCollection.js";

export class FactoryProducts extends FactoryCollection {
    private db: Db;

    constructor(db: Db) {
        super();
        this.db = db;
    }

    create(): MongoCollection {
        return new ProductCollection(this.db);
    }
}