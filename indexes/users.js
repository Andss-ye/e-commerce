import { connectDB } from "../helpers/db.js";
import { insert } from "../data/users.js";

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
        await insert();
    } catch (error) {
        console.error("Error:", error);
    } finally {
        client.close();
    }
}