import { connectDB } from '../helpers/db.js';
import { indexUsers } from '../indexes/users.js';

export async function createUsersCollection() {
  const client = await connectDB();
  const db = client.db(process.env.DB_NAME);

  const validator = {
    bsonType: 'object', 
    required: ['firstName', 'lastName', 'gender'],
    properties: { 
        _id: { bsonType: 'objectId'}, 
        firstName: {
            bsonType: 'string', 
            description: 'Ingrese el nombre del completo'
        },
        lastName: {
            bsonType: 'string', 
            description: 'Ingrese el apellido completo'
        },
        gender: {
            bsonType: 'string',
            enum: ['M', 'F'],
            description: 'Ingrese el genero del usuario y sea M o F'
        }, 
        hobbies: {
            bsonType: 'array',
            description: 'Seleccione sus pasatiempos',
            items: {
                bsonType: 'string',
                enum: ['Hornear', 'Jardineria', 'Instrumentos Musicales', 'Puzzles de logica', 'Poker y Blackjack', 'Orientacion', 'Carpinteria'],
                description: 'Seleccione alguna de las opcoiones validas'
            }
        },
        age: {
            bsonType: 'int',
            minimum: 18,
            description: 'La edad debe ser mayor de edad y un numero'
        },
    }, 
    additionalProperties: false
}


  try {
    await db.createCollection("users", { validator });
    console.log("Collection 'users' created");
    await indexUsers();
  } catch (error) {
    console.error(error)
  }
}