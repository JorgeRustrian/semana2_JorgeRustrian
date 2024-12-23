import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const imagenesPath = path.resolve(__dirname, "../imagenes");

console.log("Ruta absoluta de imágenes:", imagenesPath); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagenesPath); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); 
    } else {
        cb(new Error("Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG y JPG"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } 
});



export default upload;



