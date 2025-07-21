import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './src/common/db.js';
import { peliculaRoutes } from './src/pelicula/routes.js';
import { actorRoutes } from './src/actor/routes.js';

console.log(' Debug - peliculaRoutes:', peliculaRoutes);
console.log(' Debug - actorRoutes:', actorRoutes);
console.log(' Debug - Tipo peliculaRoutes:', typeof peliculaRoutes);
console.log(' Debug - Tipo actorRoutes:', typeof actorRoutes);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido al cine Iplacex');
});

console.log(' Registrando rutas /api...');

app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

console.log(' Rutas registradas');

const startServer = async () => {
    try {
      
        await connectToDatabase();
        
        app.listen(PORT, () => {
            console.log(` Servidor Express ejecutándose en puerto ${PORT}`);
            console.log(` API disponible en: http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error(" Error al iniciar el servidor:", error);
        process.exit(1);
    }
};

startServer();
