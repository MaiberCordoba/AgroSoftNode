import { Router } from "express";
import {
  actualizarAfecciones,
  buscarAfecciones,
  eliminarAfecciones,
  listarAfecciones,
  registrarAfecciones,
} from "../controllers/afecciones.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const rutaAfecciones = Router();
rutaAfecciones.get("/afecciones", verifyJWT, listarAfecciones);
rutaAfecciones.post("/afecciones",verifyJWT, registrarAfecciones);
rutaAfecciones.put("/afecciones/:id",verifyJWT, actualizarAfecciones);
rutaAfecciones.delete("/afecciones/:id", verifyJWT, eliminarAfecciones);
rutaAfecciones.get("/afecciones/:id", verifyJWT, buscarAfecciones);

export default rutaAfecciones;
