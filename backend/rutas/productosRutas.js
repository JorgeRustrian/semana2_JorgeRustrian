import { Router } from "express";
import { obtenerProductos,obtenerProductosPorid,insertarProductos, actualizarProducto,  cambiarEstadoProducto} from "../controladores/productosControlador.js";
import upload from "../config/multer.js";
const productosRouter=Router();

productosRouter.get("/verProductos",obtenerProductos);
productosRouter.get("/verProductos/:id",obtenerProductosPorid);
productosRouter.post("/insertarProductos", upload.single("foto"), (req, res, next) => {
    console.log("Body:", req.body);
    console.log("File:", req.file);
    next();
}, insertarProductos);
productosRouter.patch("/actualizarProductos",actualizarProducto);
productosRouter.patch("/cambiarEstadoProductos",cambiarEstadoProducto);
export default productosRouter



