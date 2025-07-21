import { ObjectId } from 'mongodb';
import { getDatabase } from '../common/db.js';
import { validarActor } from './actor.js';

const actorCollection = () => getDatabase().collection('actores');
const peliculaCollection = () => getDatabase().collection('peliculas');

export const handleInsertActorRequest = async (req, res) => {
    try {
        const nuevoActor = req.body;
     
        const errores = validarActor(nuevoActor);
        if (errores.length > 0) {
            return res.status(400).json({ error: errores });
        }
        

        const peliculaExiste = await peliculaCollection().findOne({ 
            nombre: nuevoActor.idPelicula 
        });
        
        if (!peliculaExiste) {
            return res.status(400).json({ 
                error: 'La película especificada no existe' 
            });
        }
        
        const resultado = await actorCollection().insertOne(nuevoActor);
        res.status(201).json({ _id: resultado.insertedId, ...nuevoActor });
    } catch (error) {
        console.error('Error insertando actor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const handleGetActoresRequest = async (req, res) => {
    try {
        const actores = await actorCollection().find({}).toArray();
        res.status(200).json(actores);
    } catch (error) {
        console.error('Error obteniendo actores:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const handleGetActorByIdRequest = async (req, res) => {
    try {
        const { id } = req.params;
        

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Id mal formado' });
        }
        
        const actor = await actorCollection().findOne({ _id: new ObjectId(id) });
        
        if (!actor) {
            return res.status(404).json({ error: 'Actor no encontrado' });
        }
        
        res.status(200).json(actor);
    } catch (error) {
        console.error('Error obteniendo actor por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const handleGetActoresByPeliculaIdRequest = async (req, res) => {
    try {
        const { pelicula } = req.params;
        
        const actores = await actorCollection().find({ 
            idPelicula: pelicula 
        }).toArray();
        
        res.status(200).json(actores);
    } catch (error) {
        console.error('Error obteniendo actores por película:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
