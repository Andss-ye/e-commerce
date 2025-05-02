import { connectDB } from '../helpers/db.js';

export const insert = async () => {
    const client = await connectDB();
    const db = client.db(process.env.DB_NAME);
    const products = db.collection('products');
    const data = []
    try {
        let res = await products.insertMany(data);
        console.log("Datos del producto insertados");
        console.log(res);
    } catch ({ writeErrors, ...error }) {
        console.error("Error:", error);
    } finally {
        await client.close();
        console.log("products data connection closed");
    }
}