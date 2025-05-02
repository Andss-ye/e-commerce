import { Db } from 'mongodb';
import { MongoCollection } from '../collections/mongoCollection.js';
import { FactoryCollection } from './FactoryCollection.js';
import { MakerCollection } from '../collections/MakerCollection.js';

export class FactoryMakers extends FactoryCollection {
    private db: Db;

    constructor(db: Db) {
        super();
        this.db = db;
    }
    
    create(): MongoCollection {
        return new MakerCollection(this.db);
    }
}