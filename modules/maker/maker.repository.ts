import { Db, ObjectId } from "mongodb";
import { Maker } from "./maker.model.js";

export class MakerRepository {
    private db: Db;
    private collection = () => this.db.collection<Maker>("makers");

    constructor(db: Db) {
        this.db = db;
    }

    async create(maker: Maker) {
        const result = await this.collection().insertOne(maker);
        return result.insertedId.toString();
    }

    async findById(id: string) {
        return this.collection().findOne({ _id: new ObjectId(id) });
    }

    async findAll() {
        return this.collection().find().toArray();
    }

    async update(id: string, data: Partial<Maker>) {
        await this.collection().updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }

    async delete(id: string) {
        await this.collection().deleteOne({ _id: new ObjectId(id) });
    }
}