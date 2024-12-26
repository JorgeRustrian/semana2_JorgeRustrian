import categoriaProductos from "../schemas/categoriaProductos_schema.js";

const insertarCategoriaProductos = async (req, res) => {
    const { usuarios_idusuarios, nombre } = req.body;

   
    if (!usuarios_idusuarios || !nombre) {
        return res.status(400).json({
            error: "Faltan datos requeridos: usuarios_idusuarios y nombre son obligatorios.",
        });
    }

    try {
        
        const nuevaCategoria = await categoriaProductos.create({
            usuarios_idusuarios,
            nombre,
            fecha_creacion: new Date()
        });

       
        res.status(201).json({
            mensaje: "Categoría creada exitosamente.",
            categoria: nuevaCategoria,
        });
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
};
const actualizacionCategoriaProductos= async (req,res)=>{
    try{
        const{idCategoriaProductos,usuarios_idusuarios,nombre}=req.body;
        if (!Number.isInteger(idCategoriaProductos)){
            return res.status(400).json({
                error: "El idCategoriaProductos debe ser un entero",
            });
        }


    if (!idCategoriaProductos&&!usuarios_idusuarios&&!nombre ) {
    return res.status(400).json({
        error: "No se proporcionaron campos válidos para actualizar",
    });}

    const categoria= await categoriaProductos.findByPk(idCategoriaProductos);
      if (!idCategoriaProductos) {
        return res.status(404).json({
            error: "Categoria de productos no encontrada",
        });
    }
    await categoria.update({
        ...(usuarios_idusuarios&& {usuarios_idusuarios}),
        ...(nombre&& { nombre })
    });

   
    return res.status(200).json({
        mensaje: "Datos de la categoria actualizados exitosamente",
       // categoriaProductos: categoriaProductos
    });
}
    catch(error){
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
const eliminarCategoria= async(req,res)=>{
         try {
            const{idCategoriaProductos}=req.body;
            if (!Number.isInteger(idCategoriaProductos) || idCategoriaProductos===null){
                return res.status(400).json({
                    error: "El idCategoriaProductos debe ser un entero y es obligatorio",
                });
            }
            const categoria= await categoriaProductos.findByPk(idCategoriaProductos);
            if(!categoria){
                return res.status(400).json({
                    error: "La categoria no existe en los registros",
                });
            }
            await categoria.destroy();
            res.status(200).json({
                message:"Categoria totalmente eliminada de los registros"
            })
            
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


export {insertarCategoriaProductos,actualizacionCategoriaProductos,eliminarCategoria};