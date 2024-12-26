import verificarRol from "../controladores/rolControlador.js";

const autorizacionPorRol = (rolesPermitidos) => {
    return async (req, res, next) => {
        try {
            const idRol = req.payload.idRol; 
            const nombreRol = await verificarRol(idRol); 
            if (!rolesPermitidos.includes(nombreRol)) {
                return res.status(403).send("Acceso denegado: permisos insuficientes");
            }

            next(); 
        } catch (error) {
            return res.status(403).send("Acceso denegado: error al verificar el rol");
        }
    };
};

export default autorizacionPorRol;
