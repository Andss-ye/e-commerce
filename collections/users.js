import { getClient } from '../helpers/db.js';

export async function createUsersCollection() {
  const client = await getClient();
  const db = client.db(process.env.DB_NAME);

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
    console.log("Collection 'users' created");
  } catch (error) {
    console.error(error)
  }
}