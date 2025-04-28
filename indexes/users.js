import { connectDB } from "../helpers/db";

export async function indexUsers() {
    const client = await connectDB();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users");
    const indexFields = {
        name: 1
    };
    const indexOptions = {
        name: "idx_name",
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