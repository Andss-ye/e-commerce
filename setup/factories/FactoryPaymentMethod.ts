import { MongoCollection } from '../collections/mongoCollection.js';
import { FactoryCollection } from './FactoryCollection.js';
import { PaymentMethodCollection } from '../collections/PaymentMethodCollection.js';
import { Db } from 'mongodb';

export class FactoryPaymentMethod extends FactoryCollection {
    private db: Db;

    constructor(db: Db) {
        super();
        this.db = db;
    }

    create(): MongoCollection {
        return new PaymentMethodCollection(this.db);
    }
}