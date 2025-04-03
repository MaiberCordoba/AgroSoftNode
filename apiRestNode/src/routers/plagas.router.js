import { Router } from "express";
import {
  actualizarPlagas,
  buscarPlaga,
  eliminarPlagas,
  listarPlagas,
  registrarPlagas,
} from "../controllers/plagas.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';


const rutaPlagas = Router();

rutaPlagas.get("/plagas",verifyJWT, listarPlagas);
rutaPlagas.post("/plagas",verifyJWT, registrarPlagas);
rutaPlagas.put("/plagas/:id",verifyJWT, actualizarPlagas);
rutaPlagas.delete("/plagas/:id",verifyJWT, eliminarPlagas);
rutaPlagas.get("/plagas/:id",verifyJWT, buscarPlaga);

export default rutaPlagas;
