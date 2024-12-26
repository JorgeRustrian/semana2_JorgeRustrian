import clientes from"../schemas/clientesSchema.js";

const actualizarClientes= async(req,res)=>{
    try {
        const {usuarios_idUsuario,razon_social,nombre_comercial,direccion_entrega}=req.body;
       
        if (!usuarios_idUsuario&&!razon_social&&!nombre_comercial && !direccion_entrega) {
            return res.status(400).json({
                error: "No se proporcionaron campos válidos para actualizar",
            });}
            const cliente= await clientes.findByPk(usuarios_idUsuario);
            if(!cliente){
                return res.status(404).json({
                    error:"Usuario no enconttrado"
                });
            
            }
            await cliente.update(
                {
                    ...(razon_social && {razon_social}),
                    ...(nombre_comercial && {nombre_comercial}),
                    ...(direccion_entrega&&{direccion_entrega})
                }
            )
            res.status(200).json({
                message:"Cliente actualizado correctamente",
                cliente:cliente
            }
            )

    } catch (error) {
        console.error("Error en la transacción: ", error);
        if(error.name==="SequelizeValidationError"){
            return res.status(400).json({
                error: "Error de validacion",
                detalles: error.errors.map((err)=>err.message)
            });

        }
        res.status(500).json({error: "Error al insertar en la bd  ",detalles: {
            message: error.message,        
            name: error.name,             
            stack: error.stack   } });
    }
}

export default actualizarClientes;