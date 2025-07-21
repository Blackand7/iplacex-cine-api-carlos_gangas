import { ObjectId } from 'mongodb';
import { getDatabase } from '../common/db.js';
import { validarPelicula } from './pelicula.js';

// Constante global para la colección
const peliculaCollection = () => getDatabase().collection('peliculas');

// Controlador para insertar película
export const handleInsertPeliculaRequest = async (req, res) => {
    try {
        const nuevaPelicula = req.body;
        
        // Validar estructura
        const errores = validarPelicula(nuevaPelicula);
        if (errores.length > 0) {
            return res.status(400).json({ error: errores });
        }
        
        const resultado = await peliculaCollection().insertOne(nuevaPelicula);
        res.status(201).json({ _id: resultado.insertedId, ...nuevaPelicula });
    } catch (error) {
        console.error('Error insertando película:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener todas las películas
export const handleGetPeliculasRequest = async (req, res) => {
    try {
        const peliculas = await peliculaCollection().find({}).toArray();
        res.status(200).json(peliculas);
    } catch (error) {
        console.error('Error obteniendo películas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener película por ID
export const handleGetPeliculaByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Id mal formado' });
        }
        
        const pelicula = await peliculaCollection().findOne({ _id: new ObjectId(id) });
        
        if (!pelicula) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        
        res.status(200).json(pelicula);
    } catch (error) {
        console.error('Error obteniendo película por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar película por ID
export const handleUpdatePeliculaByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const actualizacion = req.body;
        
        // Validar ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Id mal formado' });
        }
        
        const resultado = await peliculaCollection().updateOne(
            { _id: new ObjectId(id) },
            { $set: actualizacion }
        );
        
        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        
        const peliculaActualizada = await peliculaCollection().findOne({ _id: new ObjectId(id) });
        res.status(200).json(peliculaActualizada);
    } catch (error) {
        console.error('Error actualizando película:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar película por ID
export const handleDeletePeliculaByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Id mal formado' });
        }
        
        const resultado = await peliculaCollection().deleteOne({ _id: new ObjectId(id) });
        
        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        
        res.status(200).json({ mensaje: 'Película eliminada exitosamente' });
    } catch (error) {
        console.error('Error eliminando película:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
