import { Router } from "express";
import { validarActualizacionCategoriaProductos, validarCategoriaProductos, validarEliminacionCategoriaProductos } from "../middlewares/validacionCategoriaProductos.js";
import { actualizacionCategoriaProductos, eliminarCategoria, insertarCategoriaProductos } from "../controladores/categoriaProductosControlador.js";

const categoriaProductosRouter=Router();
export default categoriaProductosRouter;
categoriaProductosRouter.post("/insertarCategoria",validarCategoriaProductos,insertarCategoriaProductos);
categoriaProductosRouter.patch("/actualizarCategoria",validarActualizacionCategoriaProductos,actualizacionCategoriaProductos);
categoriaProductosRouter.delete("/eliminarCategoria",validarEliminacionCategoriaProductos,eliminarCategoria);