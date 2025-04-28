import { connectDB } from "../helpers/db.js";
import { indexMakers } from "../indexes/makers.js";

export async function createMakersCollection() {
  const client = await connectDB();
  const db = client.db(process.env.DB_NAME);

  const validator = {
    $jsonSchema: {
        bsonType: 'object', 
        required: ['name'],
        properties: { 
            _id: { bsonType: 'objectId'}, 
            code: {
                bsonType: 'string', 
                description: 'Ingrese el codigo del fabricante'
            } ,
            name: {
                bsonType: 'string', 
                description: 'Ingrese el nombre del fabricante'
            }, 
            description: {
                bsonType: 'string', 
                description: 'Ingrese un comentario del fabricante'
            }
        }, 
        additionalProperties: false
    }
}

  try {
    await db.createCollection("makers", { validator });
    console.log("Collection 'makers' created");
    await indexMakers();
  } catch (error) {
    console.error(error)
  }
}