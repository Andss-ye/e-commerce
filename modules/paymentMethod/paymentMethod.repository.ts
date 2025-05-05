import { PaymentMethod } from "./paymentMethod.model.js";
import { Db, ObjectId } from "mongodb";

export class PaymentMethodRepository {
    private db: Db;
    private collection = () => this.db.collection<PaymentMethod>("payment_methods");

    constructor(db: Db) {
        this.db = db;
    }

    async create(paymentMethod: PaymentMethod) {
        const result = await this.collection().insertOne(paymentMethod);
        return result.insertedId.toString();
    }

    async findById(id: string) {
        return this.collection().findOne({ _id: new ObjectId(id) });
    }

    async findAll() {
        return this.collection().find().toArray();
    }

    async update(id: string, data: Partial<PaymentMethod>) {
        await this.collection().updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }

    async delete(id: string) {
        await this.collection().deleteOne({ _id: new ObjectId(id) });
    }
}