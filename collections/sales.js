import { connectDB } from "../helpers/db.js";

export async function createSalesCollection() {
    const client = await connectDB();
    const db = client.db(process.env.DB_NAME);
  
    const validator = {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'date',
          'payment_method',
          'client',
          'seller',
          'details'
        ],
        properties: {
          reference: {
            bsonType: 'int'
          },
          date: {
            bsonType: 'date'
          },
          payment_method: {
            bsonType: 'objectId'
          },
          client: {
            bsonType: 'objectId'
          },
          seller: {
            bsonType: 'objectId'
          },
          details: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: [
                'product',
                'quantity',
                'price'
              ],
              properties: {
                product: {
                  bsonType: 'objectId'
                },
                quantity: {
                  bsonType: 'int'
                },
                price: {
                  bsonType: 'int'
                }
              }
            }
          }
        }
      }
    }
  
    try {
      await db.createCollection("sales", { validator });
      console.log("Collection 'sales' created");
    } catch (error) {
      console.error(error)
    }
  }