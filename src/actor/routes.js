import express from 'express';
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
} from './controller.js';

const actorRoutes = express.Router();

// Rutas para actores
actorRoutes.post('/actor', handleInsertActorRequest);
actorRoutes.get('/actores', handleGetActoresRequest);
actorRoutes.get('/actor/:id', handleGetActorByIdRequest);
actorRoutes.get('/actor/:pelicula', handleGetActoresByPeliculaIdRequest);

export { actorRoutes };
