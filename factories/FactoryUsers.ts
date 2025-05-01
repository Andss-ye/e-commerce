import { MongoCollection } from "../collections/mongoCollection.js";
import { FactoryCollection } from "./FactoryCollection.js";
import { UserCollection } from "../collections/UserCollection.js";
import { Db } from "mongodb";

export class FactoryUsers extends FactoryCollection {
    private db: Db;

    constructor(db: Db) {
        super();
        this.db = db;
    }
    
    create(): MongoCollection {
        return new UserCollection(this.db);
    }
}