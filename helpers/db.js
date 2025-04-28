import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('La variable de entorno MONGODB_URI no está definida');
}

const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    console.log('Conexión exitosa a MongoDB');
    return client;
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    throw error;
  }
}

export async function closeDB() {
  try {
    await client.close();
    console.log('Conexión a MongoDB cerrada');
  } catch (error) {
    console.error('Error al cerrar la conexión con MongoDB:', error);
    throw error;
  }
}

export function getClient() {
  return client;
}