import express from 'express';
import path from 'path'; 
const app = express();
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use('/imagenes', express.static(path.join(__dirname, "backend/imagenes")));
console.log();

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        return res.status(400).json({ error: err.message });
    } else if (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: err.message });
    }
    next();
});

export default app;
