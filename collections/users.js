import { connectDB } from "../helpers/db";

export async function createUsersCollection() {
    const db = await connectDB();

    const validator = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email"],
            properties: {
                name: {
                    bsonType: "string",
                },
                email: {
                    bsonType: "string",
                    pattern: "^.+@.+$",
                },
                age: {
                    bsonType: "int",
                }
            }
        }
    };

    try {
        await db.createCollection("users", { validator });
        console.log("collection 'users' created");
    } catch (error) {
        throw error
    }
}