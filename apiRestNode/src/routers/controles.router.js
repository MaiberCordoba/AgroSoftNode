import { Router } from "express";
import {
  actualizarControles,
  eliminarControles,
  listarControles,
  registrarControles,
} from "../controllers/controles.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const rutaControles = Router();

rutaControles.get("/controles",verifyJWT, listarControles);
rutaControles.post("/controles", verifyJWT,registrarControles);
rutaControles.put("/controles/:id",verifyJWT, actualizarControles);
rutaControles.delete("/controles/:id",verifyJWT, eliminarControles);

export default rutaControles;
