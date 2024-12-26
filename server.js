import "#config/env.js";
import app from'./app.js';
import productosRouter from "./backend/rutas/productosRutas.js";
import {conexion} from '#config/db.js';
import usuariosRouter from"./backend/rutas/usuariosRutas.js";
import estadosRouter from "./backend/rutas/estadosRutas.js";
import clientesRouter from"./backend/rutas/clientesRutas.js";
import categoriaProductosRouter from "./backend/rutas/categoriaProductosRutas.js";


const PORT = process.env.PORT || 3000;
app.use("/productos",productosRouter);
app.use("/usuarios",usuariosRouter);
app.use("/estados",estadosRouter);
app.use("/clientes",clientesRouter);
app.use("/categoriaProductos",categoriaProductosRouter);


app.listen(PORT, async () => {
   await conexion();
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});