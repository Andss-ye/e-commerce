import { connectDB } from "../helpers/db.js";
import { indexProducts } from "../indexes/products.js";

export async function createProductsCollection() {
  const client = await connectDB();
  const db = client.db(process.env.DB_NAME);

  const validator = {
    bsonType: 'object', 
    required: ['name', 'price', 'maker'],
    properties: { 
        _id: { bsonType: 'objectId'}, 
        code: {
            bsonType: 'string', 
            description: 'Ingrese el codigo del producto'
        },
        name: {
            bsonType: 'string', 
            description: 'Ingrese el nombre del producto'
        }, 
        price: {
            bsonType: 'double', 
            description: 'Ingrese el precio del producto'
        },
        maker: {
            bsonType: 'string', 
            description: 'Numero del fabricante'
        }, 
           description: {
            bsonType: 'string', 
            description: 'Ingrese ficha tecnica del producto'
        }
    }, 
    additionalProperties: false
}

  try {
    await db.createCollection("products", { validator });
    console.log("Collection 'products' created");
    await indexProducts();
  } catch (error) {
    console.error(error)
  }
}