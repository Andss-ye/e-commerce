import { connectDB } from "../helpers/db.js";
import { indexPaymentMethods } from "../indexes/paymentMethods.js";

export async function createPaymentMethodsCollection() {
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
    await db.createCollection("payment_methods", { validator });
    console.log("Collection 'payment_methods' created");
    await indexPaymentMethods();
  } catch (error) {
    console.error(error)
  }
}