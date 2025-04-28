import { connectDB } from "../helpers/db.js";

export async function createProductsCollection() {
  const client = await connectDB();
  const db = client.db(process.env.DB_NAME);

  const validator = {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        "code",
        "name",
        "description",
        "images",
        "price",
        "stock",
        "categories",
        "condition"
      ],
      properties: {
        code: {
          bsonType: 'string'
        },
        name: {
          bsonType: 'string'
        },
        description: {
          bsonType: 'string'
        },
        images: {
          bsonType: 'array',
          items: {
            bsonType: 'string',
            pattern: "^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9]{1,6}\\b(?:[-a-zA-Z0-9@:%_+.~#?&/=]*)$"
          }
        },
        price: {
          bsonType: 'double',
        },
        stock: {
          bsonType: 'int'
        },
        categories: {
          bsonType: 'objectId'
        },
        brand: {
          bsonType: 'string'
        },
        condition: {
          bsonType: 'string',
          enum: ['new', 'used', 'remanufactured']
        },
        vat: {
          bsonType: 'int'
        },
        active: {
          bsonType: 'bool'
        }
      }
    }
  }

  try {
    await db.createCollection("products", { validator });
    console.log("Collection 'products' created");
  } catch (error) {
    console.error(error)
  }
}