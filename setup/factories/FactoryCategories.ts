import { MongoCollection } from '../collections/mongoCollection.js';
import { FactoryCollection } from './FactoryCollection.js';
import { CategorieCollection } from '../collections/CategorieCollection.js';
import { Db } from 'mongodb';

export class FactoryCategories extends FactoryCollection {
  private db: Db;

  constructor(db: Db) {
    super();
    this.db = db;
  }

  create(): MongoCollection {
    return new CategorieCollection(this.db);
  }
}