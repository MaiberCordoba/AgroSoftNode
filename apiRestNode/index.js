//Importaciones
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();


//Inicializaciones
const app = express();
// Opciones de CORS (personaliza según tus necesidades)
const corsOptions = {
  origin: [
    'http://localhost:5173', // Frontend Vite (React)
    'http://127.0.0.1:5173',
    'https://tudominio.com'  // En producción
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ],
  credentials: true, // Permite cookies/tokens
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middlewares clave
app.use(cors(corsOptions)); // Habilita CORS con las opciones
app.options('*', cors(corsOptions)); // Habilita preflight para TODAS las rutas
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/views/public'));


//Routers
import docs from "./src/routers/docs.router.js";
import rutaTipoPlaga from "./src/routers/tipoPlaga.router.js";
import rutaPlagas from "./src/routers/plagas.router.js";
import rutaAfecciones from "./src/routers/afecciones.router.js";
import rutaTiposControl from "./src/routers/tiposControl.router.js";
import rutaControles from "./src/routers/controles.router.js";
import rutaProductosControl from "./src/routers/productosControl.router.js";
import rutaUsoProductoControl from "./src/routers/usoProductoControl.router.js";
import usuariosRouter from './src/routers/usuarios.router.js';
import pasantesRouter from './src/routers/pasantes.router.js';
import evapotranspiraciones from './src/routers/evapotranspiraciones.router.js';
import temperaturas from './src/routers/temperaturas.router.js';
import iluminaciones from './src/routers/iluminaciones.router.js';
import precipitaciones from './src/routers/precipitaciones.router.js';
import velocidadViento from './src/routers/velocidadViento.router.js';
import cosechas from './src/routers/cosechas.router.js';
import desechos from './src/routers/desechos.router.js';
import especies from './src/routers/especies.router.js';
import semilleros from './src/routers/semilleros.router.js';
import tiposDesecho from './src/routers/tiposDesecho.router.js';
import tiposEspecie from './src/routers/tiposEspecie.router.js';
import ventas from './src/routers/ventas.router.js';
import eras from './src/routers/eras.router.js'
import lotes from './src/routers/lotes.router.js'
import pHs from './src/routers/pHs.router.js'
import humedadTerreno from './src/routers/humedadTerreno.router.js'
import cultivos from './src/routers/cultivos.router.js'
import plantaciones from './src/routers/plantaciones.router.js'
import herramientas from './src/routers/herramientas.router.js'
import insumos from './src/routers/insumos.router.js';
import usosHerramientas from './src/routers/usosHerramientas.router.js';
import usosProductos from './src/routers/usosProductos.js';
import actividades from './src/routers/actividades.router.js';
import humedadAmbiental from "./src/routers/humedadAmbiental.router.js";


app.use(docs);
app.use(usosHerramientas);
app.use(usosProductos);
app.use(insumos);
app.use(actividades);
app.use(herramientas);
app.use(cosechas)
app.use(desechos)
app.use(especies)
app.use(semilleros)
app.use(tiposDesecho)
app.use(tiposEspecie)
app.use(ventas)
app.use(usuariosRouter);
app.use(pasantesRouter);
app.use(eras)
app.use(lotes)
app.use(pHs)
app.use(humedadTerreno)
app.use(cultivos)
app.use(plantaciones)
app.use(evapotranspiraciones);
app.use(iluminaciones)
app.use(precipitaciones)
app.use(temperaturas)
app.use(velocidadViento)
app.use(rutaTipoPlaga);
app.use(rutaPlagas);
app.use(rutaAfecciones);
app.use(rutaTiposControl);
app.use(rutaControles);
app.use(rutaProductosControl);
app.use(rutaUsoProductoControl);
app.use(humedadAmbiental);

//404
app.use((req, res) => {
  res.status(404).json({ msg: "404 - Not Found" });
});

//Arranque del servidor
app.listen(process.env.PORT, () => {
  console.log("Server running on port: ", process.env.PORT);
});
