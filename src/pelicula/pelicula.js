
export const Pelicula = {
    _id: "ObjectId",
    nombre: "string",
    generos: "array",
    anioEstreno: "int"
};

export const validarPelicula = (pelicula) => {
    const errores = [];
    
    if (!pelicula.nombre || typeof pelicula.nombre !== 'string') {
        errores.push('El nombre es requerido y debe ser string');
    }
    
    if (!pelicula.generos || !Array.isArray(pelicula.generos)) {
        errores.push('Los géneros son requeridos y deben ser un array');
    }
    
    if (!pelicula.anioEstreno || typeof pelicula.anioEstreno !== 'number') {
        errores.push('El año de estreno es requerido y debe ser número');
    }
    
    return errores;
};
