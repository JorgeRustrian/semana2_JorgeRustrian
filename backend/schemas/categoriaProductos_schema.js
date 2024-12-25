import { DataTypes } from "sequelize";
import { sequelize } from "#config/db.js";

const categoriaProductos = sequelize.define("categoriaProductos",{
        idCategoriaProductos:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        usuarios_idusuarios:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"usuarios",
                key:"idUsuario"
            }

        },
         nombre:{
            type:DataTypes.STRING,
            allowNull:false,

         },fecha_creacion:{
            type:DataTypes.DATE,
            allowNull:false
         }
        
        
        },
    {
           tableName:"categoriaProductos",
           timestamps:false

    });

         export default categoriaProductos;