import { Router } from "express";
import { validarUsuario,validarActualizacionDatosUsuario,validacionEstadosUsuarios, validarLoginUsuario } from "../middlewares/validacionusuarios.js";
import { insertarusuario,actualizarDatosUsuario,activar_desactivar_usuario,login} from "../controladores/usuariosControlador.js";
import usuarioJWT from "../middlewares/validacionJWTUsuarios.js";
import autorizacionPorRol from "../middlewares/validacionRolUsuarios.js";
const usuariosRouter = Router();

usuariosRouter.post('/registro',usuarioJWT,validarUsuario,insertarusuario);

usuariosRouter.post("/login",usuarioJWT,validarLoginUsuario,login);
usuariosRouter.get("/perfil",usuarioJWT);

usuariosRouter.patch("/actualizar-datos/:idUsuario",usuarioJWT,validarActualizacionDatosUsuario,actualizarDatosUsuario);
usuariosRouter.patch("/update-email");
usuariosRouter.patch("/update-password");

usuariosRouter.patch("/activar-desactivar-usuario",usuarioJWT,validacionEstadosUsuarios,activar_desactivar_usuario);


export default usuariosRouter;

