import { DataTypes} from "sequelize";
import { sequelize } from "#config/db.js";

const orden = sequelize.define("orden",{
     idorden:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
     },
     usuarios_idusuarios:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"usuarios",
            key:"idUsuario"
        }
     },
     estados_idestados:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"estados",
            key:"idestados"
        }
     },
     fecha_creacion:{
      type:DataTypes.DATE,
      allowNull:false
   },
     nombre_completo:{
        type:DataTypes.STRING,
        allowNull:false
     },
     direccion:{
        type:DataTypes.STRING,
        allowNull:false
     },
     telefono:{
        type:DataTypes.STRING,
        allowNull:true
     },
    correo_electronico:{
        type:DataTypes.STRING,
        allowNull:false
     },
     fecha_entrega:{
        type:DataTypes.DATE,
        allowNull:false
     },
     total_orden:{
        type:DataTypes.FLOAT,
        allowNull:false
     }

});
export default orden;