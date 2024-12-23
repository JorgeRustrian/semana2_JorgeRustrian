import { Router } from "express";
import {validarActualizacionEstado, validarEstado,validarEliminacionEstado} from "../middlewares/validacionEstados.js";
import {insertarEstado,actualizarEstado, eliminarEstado }from "../controladores/estadosControlador.js";

const estadosRouter=Router();

estadosRouter.post("/insertarEstado",validarEstado,insertarEstado);
estadosRouter.patch("/actualizarEstado",validarActualizacionEstado,actualizarEstado);
estadosRouter.delete("/eliminarEstado",validarEliminacionEstado,eliminarEstado);

export default estadosRouter;

