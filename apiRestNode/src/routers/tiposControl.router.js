import { Router } from "express";
import {
  actualizarTipoControl,
  buscarTipoControl,
  eliminarTipoControl,
  listarTiposControl,
  registrarTipoControl,
} from "../controllers/tiposControl.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const rutaTiposControl = Router();

rutaTiposControl.get("/tiposcontrol", verifyJWT, listarTiposControl);
rutaTiposControl.post("/tiposcontrol", verifyJWT, registrarTipoControl);
rutaTiposControl.put("/tiposcontrol/:id", verifyJWT, actualizarTipoControl);
rutaTiposControl.delete("/tiposcontrol/:id",verifyJWT,  eliminarTipoControl);
rutaTiposControl.get("/tiposcontrol/:id", verifyJWT, buscarTipoControl);

export default rutaTiposControl;
