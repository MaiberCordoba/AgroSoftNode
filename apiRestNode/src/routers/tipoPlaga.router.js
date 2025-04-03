import { Router } from "express";
import {
  actualizarTipoPlaga,
  buscarTipoPlaga,
  eliminarTipoPlaga,
  listarTipoPlaga,
  registrarTipoPlaga,
} from "../controllers/tipoPlaga.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';


const ruta = Router();

ruta.get("/tipoPlaga", verifyJWT, listarTipoPlaga);
ruta.post("/tipoPlaga", verifyJWT, registrarTipoPlaga);
ruta.put("/tipoPlaga/:id", verifyJWT, actualizarTipoPlaga);
ruta.delete("/tipoPlaga/:id", verifyJWT, eliminarTipoPlaga);
ruta.get("/tipoPlaga/:id", verifyJWT, buscarTipoPlaga);
export default ruta;
