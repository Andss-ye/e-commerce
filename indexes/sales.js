import { connectDB } from "../helpers/db";

export async function indexSales() {
    const client = await connectDB();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("sales");
    const indexFields = {
        reference: 1
    };
    const indexOptions = {
        name: "idx_reference",
    };
    try {
        await collection.createIndex(indexFields, indexOptions);
        console.log("Index created");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        client.close();
    }
}