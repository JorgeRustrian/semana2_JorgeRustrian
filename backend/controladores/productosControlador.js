import { sequelize } from "#config/db.js";
import producto from "../schemas/productosSchema.js";
import upload from "#config/multer.js";

const obtenerProductos = async (req, res) => {
    try {
        const consulta = await sequelize.query('exec p_obtener_todos_los_productos');
        res.json(consulta);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos '+error });
    }
};
const obtenerProductosPorid= async (req,res)=>{
    try {
        const idProductos = req.params.id; 
    
        const resultado = await sequelize.query(
            "EXEC p_obtener_producto_especifico @idProductos = :idProductos", 
            {
                replacements: { idProductos: idProductos }, 
                type: sequelize.QueryTypes.SELECT, 
            }
        );
    
        res.json(resultado); 
} catch (error) {
    res.status(500).json({error:"Error al obtener productos por id "+error});
}
};
const insertarProductos = async (req, res) => {
    try {
        const fecha_creacion = new Date(); 
      
        console.log(req.file);

        const {  
             categoriaProductos_idCategoriaProductos, 
             usuarios_idusuarios,
            nombre, 
            marca, 
            codigo, 
            stock, 
            estados_idestados, 
            precio, 
           
        } = req.body;
    
        if (!req.file) {
            return res.status(400).json({ error: "La imagen es obligatoria" });
        }
        const rutaFoto = `/imagenes/${req.file.filename}`;
    
        const nuevoProducto = await producto.create({
            categoriaProductos_idCategoriaProductos,
            usuarios_idusuarios,
            nombre,
            marca,
            codigo,
            stock,
            estados_idestados,
            precio,
             fecha_creacion,
            rutaFoto
        });

     
        return res.status(201).json({ mensaje: "Producto creado exitosamente", nuevoProducto });
    
      
    
      
    
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
           
            return res.status(400).json({ error: "Error de validación", detalles: error.errors });
        }
        console.error("Error al insertar producto:", error);
        res.status(500).json({ error: "Error al insertar productos en la BD: " + error.message });
    }
    
};


const actualizarProducto = async (req, res) => {
    try {
        const { idProductos, campo_a_editar, valor_nuevo_campo } = req.body;

        
        const resultado = await producto.update(
            { [campo_a_editar]: valor_nuevo_campo },
            { where: { idProductos } }
        );

        if (resultado[0] === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Hubo un error al actualizar el producto" });
    }
};


const cambiarEstadoProducto = async (req, res) => {
    try {
       
        const { idProductos, nuevoEstado } = req.body;

      
        if (!idProductos || !nuevoEstado) {
            return res.status(400).json({ error: "El ID del producto y el nuevo estado son requeridos" });
        }

     
        if (![1, 2].includes(nuevoEstado)) {
            return res.status(400).json({ error: "El nuevo estado debe ser 1 (activo) o 2 (inactivo)" });
        }

       
        const productoExistente = await producto.findByPk(idProductos);
        if (!productoExistente) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

      
        productoExistente.estados_idestados = nuevoEstado;

      
        await productoExistente.save();

       
        const estadoTexto = nuevoEstado === 1 ? "activo" : "inactivo";
        return res.status(200).json({ message: `Producto marcado como ${estadoTexto} correctamente` });
    } catch (error) {
        console.error("Error al cambiar el estado del producto:", error);
        return res.status(500).json({ error: "Hubo un error al cambiar el estado del producto" });
    }
};

export {obtenerProductos,obtenerProductosPorid,insertarProductos,actualizarProducto,cambiarEstadoProducto};