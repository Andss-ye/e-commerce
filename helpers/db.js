import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.URI;

if (!uri) {
  throw new Error("there's no uri");
}

const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    console.log('');
    return client;
  } catch (error) {
    console.error('Error in connection:', error);
    throw error;
  }
}

export async function closeDB() {
  try {
    await client.close();
    console.log('Conexión closed');
  } catch (error) {
    console.error('Error in closing:', error);
    throw error;
  }
}

export function getClient() {
  return client;
}