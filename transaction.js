import { connectDB } from "./helpers/db.js";

export async function startTransaction(){
    const client = await connectDB();
    const db = client.db(process.env.DB_NAME);
    const session = client.startSession();

    try{
        const config = {
            ReadPreference : 'primary',
            readConcern: { level: "local" },
            writeConcern: { w: "majority" },
        };
        await session.withTransaction(async () => {
            const makers = db.collection("makers");
            const products = db.collection("products");
            await makers.insertOne({
                code: "M001",
                name: "Maker 1",
                description: "Description of Maker 1"
            }, { session });
            await products.insertOne({
                code: "P001",
                name: "Product 1",
                description: "Description of Product 1",
                maker: "M001"
            }, { session });
            console.log("Transaction completed successfully");
        }, config);
    } catch(error){
        console.error("Transaction aborted due to an error: ", error);
    }
    finally{
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();
        client.close();
        console.log("Session ended and client closed");
    }
}
startTransaction();