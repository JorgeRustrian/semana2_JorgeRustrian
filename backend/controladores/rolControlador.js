import rol from "../schemas/rolSchema.js"; 
const verificarRol = async (idRol) => {
    try {
        const rolEncontrado = await rol.findByPk(idRol); 
        if (!rolEncontrado) {
            throw new Error("Rol no encontrado");
        }
        return rolEncontrado.nombre; 
    } catch (error) {
        console.error(error.message);
        throw new Error("Error al verificar el rol");
    }
};

export default verificarRol;
