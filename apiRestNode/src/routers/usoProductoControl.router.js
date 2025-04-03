import { Router } from "express";
import {
  actualizarUsoProductoControl,
  eliminarUsoProductoControl,
  listarUsoProductoControl,
  registrarUsoProductosControl,
} from "../controllers/usoProductoControl.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';


const rutaUsoProductoControl = Router();

rutaUsoProductoControl.get("/usoProductoControl",verifyJWT, listarUsoProductoControl);
rutaUsoProductoControl.post(
  "/usoProductoControl",verifyJWT,
  registrarUsoProductosControl
);
rutaUsoProductoControl.put(
  "/usoProductoControl/:id",verifyJWT,
  actualizarUsoProductoControl
);
rutaUsoProductoControl.delete(
  "/usoProductoControl/:id",verifyJWT,
  eliminarUsoProductoControl
);
rutaUsoProductoControl.get("/usoProductoControl/:id", verifyJWT, listarUsoProductoControl);

export default rutaUsoProductoControl;
