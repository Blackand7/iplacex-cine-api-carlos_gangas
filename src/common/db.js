import { MongoClient } from 'mongodb';


const uri = "mongodb+srv://blackand7:Wj1vMh3hX7@examen.gfljcss.mongodb.net/cine-db?retryWrites=true&w=majority&appName=Examen";
let client;

export const connectToDatabase = async () => {
    try {
        client = new MongoClient(uri);
        await client.connect();
        console.log(" Conectado exitosamente a MongoDB Atlas");
        return client.db("cine-db");
    } catch (error) {
        console.error(" Error conectando a MongoDB Atlas:", error);
        throw error;
    }
};

export const getDatabase = () => {
    if (!client) {
        throw new Error("Base de datos no conectada");
    }
    return client.db("cine-db");
};

export const closeConnection = async () => {
    if (client) {
        await client.close();
        console.log(" Conexión a MongoDB Atlas cerrada");
    }
};
