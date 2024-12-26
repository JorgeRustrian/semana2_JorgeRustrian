import usuarios from"../schemas/usuariosSchema.js"
import clientes from"../schemas/clientesSchema.js"
import { compare, hash } from "bcrypt";
import { SignJWT } from "jose";

const insertarusuario= async (req,res) =>{
  
 
    try {
     
  
        const fecha_creacion = new Date(); 

        const {rol_idRol,estados_idestados,correo_electronico,nombre_completo,contrasena,telefono,fecha_nacimiento}=req.body
        console.log("Datos recibidos:", req.body);
      const usuarioPorCorreo= await usuarios.findOne(correo_electronico);
      if(usuarioPorCorreo){
        return res.status(409).send("correo ya en uso");
      }
      const hashPassword= await hash(contrasena,12);
        const nuevousuario=await usuarios.create(
           { rol_idRol,estados_idestados,correo_electronico,nombre_completo,contrasena:hashPassword,telefono,fecha_nacimiento,fecha_creacion}
                 

        );
      if(rol_idRol===2){
            await clientes.create(
            {usuarios_idUsuario: nuevousuario.idUsuario} )
        }
   
        res.status(201).json({mensaje:"Usuario insertado correctamente",
            nuevoUsuario:nuevousuario
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
}
const actualizarDatosUsuario= async (req,res)=>{
    try{
        const { idUsuario } = req.params; 
        if (!Number.isInteger(idUsuario)){
            return res.status(400).json({
                error: "El idUsuario debe ser un entero",
            });
        }
const{estados_idestados,nombre_completo,telefono,fecha_nacimiento}=req.body;

    if (!idUsuario&&estados_idestados&&!nombre_completo && !telefono && !fecha_nacimiento) {
    return res.status(400).json({
        error: "No se proporcionaron campos válidos para actualizar",
    });}

    const usuario = await usuarios.findByPk(idUsuario);
      if (!usuario) {
        return res.status(404).json({
            error: "Usuario no encontrado",
        });
    }
    await usuario.update({
        ...(estados_idestados && {estados_idestados}),
        ...(nombre_completo && { nombre_completo }),
            ...(telefono && { telefono }),
            ...(fecha_nacimiento && { fecha_nacimiento })
    });

   
    return res.status(200).json({
        mensaje: "Datos del usuario actualizados exitosamente",
        usuario: usuario, 
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

const activar_desactivar_usuario=async(req,res)=>{
   const{idUsuario}=req.body;
   try{
   if (!idUsuario) {
    return res.status(400).json({ error: "El idUsuario es obligatorio" });
}
const usuario = await usuarios.findOne(idUsuario);

if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
}
const nuevoEstado = usuario.estados_idestados === 3 ? 4 : 3;
usuario.estados_idestados = nuevoEstado;
await usuario.save();

const mensaje ="Estado cambiado correctamente"
   

return res.status(200).json({ mensaje, usuario });
} 

catch (error) {
console.error(error);
return res.status(500).json({
    error: "Error interno del servidor",
    detalles: error.message,
});
}


}
const login = async (req,res)=>{
const {email,password}=req.body;
const buscarPorMail=await usuarios.findOne(email);
if(!buscarPorMail){
  return  res.status(409).send("Credenciales incorrectas");
}
const comprobar=await compare(password,buscarPorMail.contrasena);
if(!comprobar){
 return  res.status(409).send("Credenciales incorrectas");
}
const encoder = TextEncoder();
const jwtConstructor= new SignJWT({idUsuario:buscarPorMail.idUsuario,
    rol_idRol:buscarPorMail.rol_idRol
});
const jwt= jwtConstructor.setProtectedHeader({alg:"HS256",
    typ:"JWT",



}).setIssuedAt().setExpirationTime("1d").sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
return res.send({jwt});

}


export {insertarusuario,actualizarDatosUsuario,activar_desactivar_usuario,login};