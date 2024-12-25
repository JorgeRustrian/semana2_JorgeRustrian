import { DataTypes } from "sequelize";
import { sequelize } from "#config/db.js";



const estados = sequelize.define("estados", {
    idestados: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(30), 
        allowNull: false
    },
    id_tipo_estado: {
        type: DataTypes.INTEGER, 
        allowNull: false
    }
}, {
    tableName: 'estados',
    timestamps: false 
});
export default estados;
