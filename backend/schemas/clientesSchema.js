import { DataTypes} from "sequelize";
import { sequelize } from "#config/db.js";

const clientes = sequelize.define("clientes",
    {
      usuarios_idUsuario:{
        type:DataTypes.INTEGER,
          primaryKey:true,
          references:{
            model:"usuarios",
            key:"idUsuario"
          },
          allowNull:false
      },
      razon_social:{
        type:DataTypes.STRING,
        allowNull:true,

      },
      nombre_comercial:{
        type:DataTypes.STRING,
        allowNull:true
      },
      direccion_entrega:{
        type:DataTypes.STRING,
        alowNull:true

      }
    },{
      tableName:"clientes",
      timestamps:false

    });

export default clientes;