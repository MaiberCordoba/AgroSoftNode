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

rutaPlagas.get("/plaga",verifyJWT, listarPlagas);
rutaPlagas.post("/plaga",verifyJWT, registrarPlagas);
rutaPlagas.put("/plaga/:id",verifyJWT, actualizarPlagas);
rutaPlagas.delete("/plaga/:id",verifyJWT, eliminarPlagas);
rutaPlagas.get("/plaga/:id",verifyJWT, buscarPlaga);

export default rutaPlagas;
