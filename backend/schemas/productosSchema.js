import { DataTypes } from "sequelize";
import { sequelize } from "#config/db.js";

const producto = sequelize.define("productos", {
        idProductos: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoriaProductos_idCategoriaProductos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "El ID de la categoría debe ser un número entero" }
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100],
            notEmpty: { msg: "El nombre no puede estar vacío" },
            customString(value) {
                if (typeof value !== 'string') {
                    throw new Error('El nombre debe ser una cadena de texto');
                }
            }
        }
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50],
            notEmpty: { msg: "La marca no puede estar vacía" },
            customString(value) {
                if (typeof value !== 'string') {
                    throw new Error('La marca debe ser una cadena de texto');
                }
            }
        }
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            customString(value) {
                if (typeof value !== 'string') {
                    throw new Error("El código debe ser una cadena de texto");
                }
                if (!/^[a-zA-Z0-9]+$/.test(value)) {
                    throw new Error("El código solo puede contener letras y números");
                }
            }
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "El stock debe ser un número entero" },
            min: {
                args: [0],
                msg: "El stock no puede ser menor que 0"
            }
        }
    },
    estados_idestados: {
        type: DataTypes.ENUM(1,2),
        allowNull: false,
        defaultValue: 1,
        validate: {
            isIn: {
                args: [[1,2]],
                msg: "El estado debe ser 'activo', 'inactivo' . ! Activo. 2 inactivo"
            }
        }
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "El precio debe ser un número entero" },
            min: {
                args: [1],
                msg: "El precio debe ser mayor o igual a 1"
            }
        }
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: { msg: "La fecha de creación debe ser una fecha válida" }
        }
    },
    foto: {
      
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: { msg: "La ruta de la foto debe ser una URL válida" }
        }
    
       
    }
}, {
    tableName: "productos",
    timestamps: false
});

export default producto;



