import { Router } from "express";
import { validarActualizacionClientes } from "../middlewares/validacionClientes.js";
import actualizarClientes from "../controladores/clientesControlador.js";

const clientesRouter=Router();
clientesRouter.patch("/actualizarClientes",validarActualizacionClientes,actualizarClientes);



export default clientesRouter;