import { Router } from "express";
import {
  actualizarProductosControl,
  buscarProductosControl,
  eliminarProductosControl,
  listarProductosControl,
  registrarProductosControl,
} from "../controllers/productosControl.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';


const rutaProductosControl = Router();

rutaProductosControl.get("/productosControl",verifyJWT, listarProductosControl);
rutaProductosControl.post("/productosControl",verifyJWT, registrarProductosControl);
rutaProductosControl.put("/productosControl/:id",verifyJWT, actualizarProductosControl);
rutaProductosControl.delete("/productosControl/:id", verifyJWT,eliminarProductosControl);
rutaProductosControl.get("/productosControl/:id",verifyJWT, buscarProductosControl);

export default rutaProductosControl;
