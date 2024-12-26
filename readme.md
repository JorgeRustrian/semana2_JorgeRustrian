Estructura del proyecto           JOrge Estuardo Rustrián del Pinal      seccion: A  clave aspirante: GDA0040-OT
--backend
     --Config: Esta carpeta tiene los archivos de conexion a la base de datos, la configuracion de la libreria dotenv para usar las variables de entorno y un archivo multer que  manejara las imagenes de los productos
     --Controladores: Se encargan de usar sequelize para manipular nuestras tablas con lo que enviamos en los endpoints
     --imagenes: Donde se lamacenaran la simagenes de nuestros productos
     middlewares: Cuentan con los archivos d evalidacion de datos por medio de la librería de joi. Falta agregar los de autenticación y autorización
     --rutas: Configuracion de los endpoints.
     --schemas: Son la representacion de nuestras tablas por medio de sequelize. Para poder manipular la bd desde sequelize. 
--app.js  La configuracion de express
--server.js  Donde se lavanta nuestro servidor. El comando es "npm start "
--readme.md Documentacion del proyecto con ejemplos.
--.env Variables de entorno
--Librerias: Joi para validacion
             sequelize como ORM
             express,
             dotenv
Ejemplos de prueba
Endpoint estado. Haciendo un post a este endpoint con el siguiente json se puede crear un nuevo estado en la BD. (Estos ejemplos asumen por default el puerto 3000)
 post  http://localhost:3000/estados/insertarEstado
 {
    "nombre":"devuelto",
    "id_tipo_estado":3
}
patch  http://localhost:3000/estados/actualizarEstado           Actualiza un estado haciendo un patch. Damos en un json el idestado del estado  a actualizar y como objeto pasamos los campos a actualizar
{
    "idestados":8,
    "datos_a_actualizar":
    {
       "nombre":"bloqueado",
       "id_tipo_estado":2
    }
}

delete  http://localhost:3000/estados/eliminarEstado               Elimina un estado recibiendo el ID. 
{
    "idestados":8
}


Usuarios
post    http://localhost:3000/usuarios/registro      Crea un nuevoUsuario)
{
    "rol_idRol": 2,
    "estados_idestados": 3,
    "correo_electronico": "cliente@example.com",
    "nombre_completo": "Juan Pérez",
    "contrasena": "MiContrasena123@",
    "telefono": "54290343",
    "fecha_nacimiento": "1990-05-10"             //En este caso fecha_creacion nunca s epasa ya que en el controlador se toma la hora actual.  Al id ser 
}                                                    de un rol cliente automaticamente se guarda en la tabla clientes tambien. 

patch  http://localhost:3000/usuarios/actualizar-datos
{
    "nombre_completo": "Juan Fernando Pérez",
     "telefono": "54290343"                                                             //Este endpoint puede actualizar estados_idestados,nombre_completo,telefono,fecha_nacimiento
                                                                                         El rol, fecha de creacion e idUsuario no se pueden actualizar. S epueden pasar 1 o mas campos. contrasena y correo_electronico se actualizan en otra ruta.

}

patch  http://localhost:3000/usuarios/activar-desactivar-usuario                activa o desactiva un usuario. Solo existe borrado logico no fisico. recibe el idUsuario

 {
   "idUsuario":2
    
}

Clientes
patch  http://localhost:3000/clientes/actualizarClientes                    actualiza un cliente. En este caso no existe insercion de clientes. Ya que en la insercion de usuarios 
                                                                              se hace automatico al detectar que el rol es de cliente
{
   "usuarios_idUsuario":2,
   "direccion_entrega":"San Jose pinula"
    
}

categoriaProductos                                                              Inserta una nueva categoria. requiere el id del usuario que la genera, y el nombre d ela categoria. 
                                                                                fecha_ creacion se agrega automaticamente. El id es identity.
post  http://localhost:3000/categoriaProductos/insertarCategoria
{
  "usuarios_idusuarios": 1,
  "nombre": "Electrodomésticos"
}

patch  http://localhost:3000/categoriaProductos/actualizarCategoria       Se suministra el id de la categoria a editar. Y los campos. No es posible actualizar ni el            
                                                                           ni idCategoriaProductos ni fecha_creacion. Solo el usuario responsable d ela categoria y el nombre d ela misma.
{
    "idCategoriaProductos":1,
  "usuarios_idusuarios": 2,
  "nombre": "Muebles"
}


delete        http://localhost:3000/categoriaProductos/eliminarCategoria                  elimina fisicamente una categoria. Recibe el id

{
    "idCategoriaProductos":1

}


Pendiente: Terminar de pulir los endpoindts de productos. Crear los de orden, y agregar los middlewares de autorizacion y autenticacion. espero terminarlos a la brevedad. 



 




