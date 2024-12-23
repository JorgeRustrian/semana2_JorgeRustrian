import { DataTypes } from "sequelize";
import { sequelize } from "#config/db.js";

const rol = sequelize.define("rol",{
      idrol:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
      },
      nombre:{
         type:DataTypes.STRING,
         allowNull:false
      }

});

export default rol;