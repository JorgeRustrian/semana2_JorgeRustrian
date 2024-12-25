import { DataTypes } from "sequelize";
import { sequelize } from "#config/db.js";

const ordenDetalles = sequelize.define("ordenDetalles",{
     
      idordendetalles:{
              type:DataTypes.INTEGER,
              allowNull:false,
              primaryKey:true
      },
      orden_idorden:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"orden",
            key:"idorden"
        }
      },
      productos_idproductos:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"productos",
            key:"idProductos"
        }
      },
      cantidad:{
        type:DataTypes.INTEGER,
        allowNull:false,
      }, precio:{
        type:DataTypes.FLOAT,
        allowNull:false,
      },subtotal:{
        type:DataTypes.FLOAT,
        allowNull:false,
      }


});

export default ordenDetalles;