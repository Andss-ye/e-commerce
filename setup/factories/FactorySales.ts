import { FactoryCollection } from "./FactoryCollection.js";
import { SaleCollection } from "../collections/SaleCollection.js";
import { Db } from "mongodb";
import { MongoCollection } from "../collections/mongoCollection.js";

export class FactorySales extends FactoryCollection {
    private db: Db;

    constructor(db: Db) {
        super();
        this.db = db;
    }

    create(): MongoCollection {
        return new SaleCollection(this.db);
    }

}