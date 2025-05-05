import { Db, ObjectId } from "mongodb";
import { Sale } from "./sale.model";

export class SaleRepository {
    private db: Db;
    private collection = () => this.db.collection<Sale>("sales");

    constructor(db: Db) {
        this.db = db;
    }

    async create(sale: Sale) {
        const result = await this.collection().insertOne(sale);
        return result.insertedId.toString();
    }

    async findById(id: string) {
        return this.collection().findOne({ _id: new ObjectId(id) });
    }

    async findAll() {
        return this.collection().find().toArray();
    }

    async update(id: string, data: Partial<Sale>) {
        await this.collection().updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }

    async delete(id: string) {
        await this.collection().deleteOne({ _id: new ObjectId(id) });
    }
}