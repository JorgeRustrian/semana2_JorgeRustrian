import { Router } from "express";
import { validarUsuario,validarActualizacionDatosUsuario,validacionEstadosUsuarios } from "../middlewares/validacionusuarios.js";
import { insertarusuario,actualizarDatosUsuario,activar_desactivar_usuario} from "../controladores/usuariosControlador.js";

const usuariosRouter = Router();

usuariosRouter.post('/registro',validarUsuario,insertarusuario);

usuariosRouter.post("/login");
usuariosRouter.get("/profile");

usuariosRouter.patch("/actualizar-datos/:idUsuario",validarActualizacionDatosUsuario,actualizarDatosUsuario);
usuariosRouter.patch("/update-email");
usuariosRouter.patch("/update-password");

usuariosRouter.patch("/activar-desactivar-usuario",validacionEstadosUsuarios,activar_desactivar_usuario);


export default usuariosRouter;

