import { ObjectId } from 'mongodb';
import { getDatabase } from '../common/db.js';
import { validarPelicula } from './pelicula.js';

const peliculaCollection = () => getDatabase().collection('peliculas');

export const handleInsertPeliculaRequest = async (req, res) => {
    try {
        const nuevaPelicula = req.body;
        

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

export const handleGetPeliculasRequest = async (req, res) => {
    try {
        const peliculas = await peliculaCollection().find({}).toArray();
        res.status(200).json(peliculas);
    } catch (error) {
        console.error('Error obteniendo películas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const handleGetPeliculaByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        
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

export const handleUpdatePeliculaByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const actualizacion = req.body;
        
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

export const handleDeletePeliculaByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        
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
