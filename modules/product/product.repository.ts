import { Db, ObjectId } from "mongodb";
import { Product } from "./product.model.js";

export class ProductRepository {
    private db: Db;
    private collection = () => this.db.collection<Product>("products");

    constructor(db: Db) {
        this.db = db;
    }

    async create(product: Product) {
        const result = await this.collection().insertOne(product);
        return result.insertedId.toString();
    }

    async findById(id: string) {
        return this.collection().findOne({ _id: new ObjectId(id) });
    }

    async findAll() {
        return this.collection().find().toArray();
    }

    async update(id: string, data: Partial<Product>) {
        await this.collection().updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }

    async delete(id: string) {
        await this.collection().deleteOne({ _id: new ObjectId(id) });
    }
}