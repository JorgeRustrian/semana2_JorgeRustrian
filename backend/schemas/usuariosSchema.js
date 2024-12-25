import { sequelize } from "#config/db.js";
import { DataTypes } from "sequelize";

const usuarios = sequelize.define("usuarios", {
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    rol_idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "rol",
            key: "idrol",
        },
        validate: {
            isInt: {
                msg: "El rol debe ser un número entero.",
            },
            notNull: {
                msg: "El rol es obligatorio.",
            }
        }
    },
    estados_idestados: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "estados",
            key: "idestados",
        },
        validate: {
            isInt: {
                msg: "El estado debe ser un número entero.",
            },
         
            notNull: {
                msg: "El estado es obligatorio.",
            }
        }
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "El correo electrónico debe tener un formato válido.",
            },
            notNull: {
                msg: "El correo electrónico es obligatorio.",
            }
        }
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 100],
                msg: "El nombre completo debe tener entre 3 y 100 caracteres.",
            },
            notNull: {
                msg: "El nombre completo es obligatorio.",
            }
        }
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 100],
                msg: "La contraseña debe tener entre 8 y 100 caracteres.",
            },
            notNull: {
                msg: "La contraseña es obligatoria.",
            }
        }
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
       
        
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      
          
       
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: {
                msg: "La fecha de creación debe ser una fecha válida.",
            }
        },
        set(value) {
         
            const date = new Date(value);
            this.setDataValue('fecha_creacion', date.toISOString().split('T')[0]); 
        }
    }
},
{
    tablename:"usuarios",
    timestamps: false,
    
});
 



export default usuarios;
