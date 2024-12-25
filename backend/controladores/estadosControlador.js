import estados from "../schemas/estadosSchema.js";

const insertarEstado= async(req,res)=>{
   
try {
   
    const {nombre,id_tipo_estado}=req.body;
    const nuevoEstado=await estados.create({
        nombre,
        id_tipo_estado
    });

    res.status(201).json({
        mensaje:"Estado insertado correctamente",
        nuevoEstado:nuevoEstado
})
} catch (error) {
     if (error.name === "SequelizeValidationError") {
         
            return res.status(400).json({
                error: "Error de validación",
                detalles: error.errors.map((err) => err.message),
            });
        }

        console.error("Error al insertar estado", error);
        res.status(500).json({ error: "Error al insertar estado en la base de datos"+error.message});
}

};
const actualizarEstado= async (req,res)=>{
    
    try {
        const { idestados, datos_a_actualizar } = req.body;

        if (!idestados || !datos_a_actualizar || typeof datos_a_actualizar !== "object") {
            return res.status(400).json({
                error: "El ID del estado y los datos a actualizar son obligatorios.",
            });
        }
        
        const estadoExistente = await estados.findByPk(idestados);
        if (!estadoExistente) {
            return res.status(404).json({ error: "Estado no encontrado." });
        }
        
   
        Object.keys(datos_a_actualizar).forEach((campo) => {
            if (estados.rawAttributes[campo]) { 
                estadoExistente[campo] = datos_a_actualizar[campo];
            }
        });
        
        await estadoExistente.save();
       
        return res.status(200).json({
            mensaje: "Estado actualizado correctamente.",
            estados: estadoExistente,
        });
        
    } catch (error) {
       
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                error: "Error de validación",
                detalles: error.errors.map((err) => err.message),
            });
        }

        console.error("Error al insertar estado", error);
        res.status(500).json({ error: "Error al insertar estado en la base de datos"+error.message });
        
    }
}
const eliminarEstado = async (req, res) => {
   
    try {
       const { idestados } = req.body;
       const estadoExistente = await estados.findByPk(idestados);
    if (!estadoExistente) {
            return res.status(404).json({ error: "Estado no encontrado" });
        }
 await estadoExistente.destroy();

        return res.status(200).json({ message: `Estado con ID ${idestados} eliminado correctamente.` });
    } catch (error) {
       
        console.error("Error al eliminar estado:", error);
        return res.status(500).json({ error: "Hubo un error al eliminar el estado: " + error.message });
    }
};
export {insertarEstado,actualizarEstado,eliminarEstado};