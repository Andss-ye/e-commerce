import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('La variable de entorno MONGODB_URI no está definida');
}

const client = new MongoClient(uri);

export async function run() {
  try {
    await client.connect();
  } finally {
    await client.close();
  }
}