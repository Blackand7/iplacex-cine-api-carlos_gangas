// Schema para Actor
export const Actor = {
    _id: "ObjectId",
    idPelicula: "string",
    nombre: "string",
    edad: "int",
    estaRetirado: "bool",
    premios: "array"
};

// Función para validar estructura de actor
export const validarActor = (actor) => {
    const errores = [];
    
    if (!actor.idPelicula || typeof actor.idPelicula !== 'string') {
        errores.push('El idPelicula es requerido y debe ser string');
    }
    
    if (!actor.nombre || typeof actor.nombre !== 'string') {
        errores.push('El nombre es requerido y debe ser string');
    }
    
    if (!actor.edad || typeof actor.edad !== 'number') {
        errores.push('La edad es requerida y debe ser número');
    }
    
    if (typeof actor.estaRetirado !== 'boolean') {
        errores.push('estaRetirado es requerido y debe ser boolean');
    }
    
    if (!actor.premios || !Array.isArray(actor.premios)) {
        errores.push('Los premios son requeridos y deben ser un array');
    }
    
    return errores;
};
