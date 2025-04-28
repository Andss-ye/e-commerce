import { connectDB } from '../helpers/db.js';

export const insert = async () => {
    const client = await connectDB();
    const db = client.db(process.env.DB_NAME);
    const products = db.collection('products');
    const data = [
        { code: "1", name: 'Disco duro SATA3 1TB', price: 86.99, maker: "5" },
        { code: "2", name: 'Memoria RAM DDR4 8GB', price: 120.99, maker: "6" },
        { code: "3", name: 'Disco SSD 1 TB', price: 150.99, maker: "4" },
        { code: "4", name: 'GeForce GTX 1050Ti', price: 185.99, maker: "7" },
        { code: "5", name: 'GeForce GTX 1080 Xtreme', price: 755.99, maker: "6" },
        { code: "6", name: 'Monitor 24 LED Full HD', price: 202.99, maker: "1" },
        { code: "7", name: 'Monitor 27 LED Full HD', price: 245.99, maker: "1" },
        { code: "8", name: 'Portátil Yoga 520', price: 559.99, maker: "2" },
        { code: "9", name: 'Portátil Ideapd 320', price: 444.99, maker: "2" },
        { code: "10", name: 'Impresora HP Deskjet 3720', price: 59.99, maker: "3" },
        { code: "11", name: 'Impresora HP Laserjet Pro M26nw', price: 180.99, maker: "3" }
    ];
    try {
        let res = await products.insertMany(data);
        console.log("Datos del producto insertados");
        console.log(res);
    } catch ({ writeErrors, ...error }) {
        const {
            errInfo: { details: { schemaRulesNotSatisfied } }
        } = writeErrors[0].err;
        console.log(schemaRulesNotSatisfied[0]);
    } finally {
        await client.close();
        console.log("products data connection closed");
    }
}