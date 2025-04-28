import { connectDB } from "../helpers/db";

export async function indexProducts() {
    const client = await connectDB();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("products");
    const indexFields = {
        code: 1
    };
    const indexOptions = {
        name: "idx_code",
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