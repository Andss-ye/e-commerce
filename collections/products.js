import { connectDB } from "../helpers/db.js";
import { indexProducts } from "../indexes/products.js";

export async function createProductsCollection() {
  const client = await connectDB();
  const db = client.db(process.env.DB_NAME);

  const validator = []

  try {
    await db.createCollection("products", { validator });
    console.log("Collection 'products' created");
    await indexProducts();
  } catch (error) {
    console.error(error)
  }
}