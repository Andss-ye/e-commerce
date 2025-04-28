import { connectDB } from '../helpers/db.js';

export const insert = async () => {
    const client = await connectDB();
    const db = client.db(process.env.DB_NAME);
    const users = db.collection('users');
    const data = [
        {
            firstName: "Miguel Angel",
            lastName: "Castro Escamilla",
            age: 24,
            gender: "M"
        },
        {
            firstName: "Ana Maria",
            lastName: "García López",
            age: 30,
            gender: "F",
            hobbies: ['Poker y Blackjack', 'Carpintería', 'Orientación']
        },
        {
            firstName: "Carlos Alberto",
            lastName: "Ramírez Rodríguez",
            age: 28,
            gender: "M",
            hobbies: ['Jardinería']
        },
        {
            firstName: "Laura Fernanda",
            lastName: "Hernández Sánchez",
            age: 22,
            gender: "F"
        },
        {
            firstName: "Javier Alejandro",
            lastName: "Martínez Pérez",
            age: 26,
            gender: "M",
            hobbies: ['Puzzles de lógica', 'Carpintería']
        }
    ];
    try {
        const res = await users.insertMany(data);
        if (res.acknowledged) {
            console.log("Datos del usuario insertados");
            console.log(res);
        } else {
            console.error("Error: La operación insertMany no fue exitosa.");
        }
    } catch (error) {
        console.error("Error al insertar datos:", error);
    } finally {
        await client.close();
        console.log("user data connection closed");
    }
}