import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config(); 
const sequelize = new Sequelize(
    process.env.DB_NAME,    
    process.env.DB_USER,   
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,  
        dialect: 'mssql',    
             
        port: process.env.DB_PORT,   
        dialectOptions: {
            options: {
                useUTC: false, 
                encrypt: true,      
                trustServerCertificate: true 
            }
        },
        logging: false
    }
   
);
const conexion= async ()=>{
    try{
         await sequelize.authenticate();
         console.log("Conexion a la bd exitosa")
    }
    catch(error){
        console.log("Error en: "+error);
    }

    
    
};
export {conexion,sequelize};
