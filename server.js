import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './src/common/db.js';
import { peliculaRoutes } from './src/pelicula/routes.js';
import { actorRoutes } from './src/actor/routes.js';

// Debug - verificar imports
console.log('🔍 Debug - peliculaRoutes:', peliculaRoutes);
console.log('🔍 Debug - actorRoutes:', actorRoutes);
console.log('🔍 Debug - Tipo peliculaRoutes:', typeof peliculaRoutes);
console.log('🔍 Debug - Tipo actorRoutes:', typeof actorRoutes);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta por defecto
app.get('/', (req, res) => {
    res.send('Bienvenido al cine Iplacex');
});

// Debug antes de registrar rutas
console.log('📝 Registrando rutas /api...');

// Rutas personalizadas con prefijo /api
app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

console.log('✅ Rutas registradas');

// Función para iniciar servidor
const startServer = async () => {
    try {
        // Conectar a la base de datos primero
        await connectToDatabase();
        
        // Solo si la conexión es exitosa, iniciar el servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor Express ejecutándose en puerto ${PORT}`);
            console.log(`📋 API disponible en: http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
        process.exit(1);
    }
};

startServer();