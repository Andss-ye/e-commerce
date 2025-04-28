import { connectDB } from '../helpers/db.js';

export async function createUsersCollection() {
  const client = await connectDB();
  const db = client.db(process.env.DB_NAME);

  const validator = {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "name",
        "email",
        "password",
        "document_type",
        "document_number",
        "phone",
        "place",
      ],
      properties: {
        name: {
          bsonType: "string",
        },
        email: {
          bsonType: "string",
          pattern: "^\\+?[1-9][0-9]{7,14}$"
        },
        password: {
          bsonType: "string",
          pattern: "^[A-Za-z0-9]{8,12}$",
          minLength: 8,
          maxLength: 12,
        },
        document_type: {
          bsonType: "string",
          enum: ["CC", "CE", "PS", "PEP"],
        },
        phone: {
          bsonType: "string",
          pattern: "^\\+?[1-9][0-9]{7,14}$"
        },
        place: {
          bsonType: 'object'
        },
        gender: {
          bsonType: 'string',
          enum: ['M', 'F'],
        },
        user_type: {
          bsonType: 'array',
          items: {
            bsonType: 'string'
          }
        },
        active: {
          bsonType: 'bool'
        }
      },
    },
  }

  try {
    await db.createCollection("users", { validator });
    console.log("Collection 'users' created");
  } catch (error) {
    console.error(error)
  }
}