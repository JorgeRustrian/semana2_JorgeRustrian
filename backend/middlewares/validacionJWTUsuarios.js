import { jwtVerify } from "jose"

const usuarioJWT= async (req,res,next)=>{
         const {auth}=req.headers;
         if(!auth){
           return res.status(401).send("Usuario no autorizado");
         }
         try {
          const encoder = new   TextEncoder();
            const {payload}=await jwtVerify(auth,encoder.encode(process.env.JWT_PRIVATE_KEY));
            req.idUsuario= payload.idUsuario;
              req.payload=payload;
            next();
         } catch (error) {
            return res.status(401).send("Usuario no autorizado");
         }
}

export default usuarioJWT;