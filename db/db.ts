import { MongoClient, Db } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.URI as string;
const dbName = process.env.DB_NAME as string;

if (!uri) {
  console.error("URI variable isn't");
  process.exit(1);
}

if (!dbName) {
  console.error("DB_NAME variable isn't");
  process.exit(1);
}

const client = new MongoClient(uri);

export async function connectDB(): Promise<{ client: MongoClient; db: Db }> {
  try {
    await client.connect();
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error('Error in connection:', error);
    throw error;
  }
}

export async function closeDB() {
  try {
    await client.close();
  } catch (error) {
    console.error('Error in closing:', error);
    throw error;
  }
}