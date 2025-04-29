import { connectDB } from "../helpers/db.js";
import { indexCategories } from "../indexes/categories.js";

export async function createCategoriesCollection() {
    const client = await connectDB();
    const db = client.db(process.env.DB_NAME);
  
    const validator = {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'code',
          'name'
        ],
        properties: {
          code: {
            bsonType: 'string'
          },
          name: {
            bsonType: 'string'
          },
          active: {
            bsonType: 'bool'
          }
        }
      }
    }
  
    try {
      await db.createCollection("categories", { validator });
      console.log("Collection 'categories' created");
      await indexCategories();
    } catch (error) {
      console.error(error)
    }
  }