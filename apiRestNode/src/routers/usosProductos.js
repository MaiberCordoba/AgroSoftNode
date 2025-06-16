import { Router } from "express";
import { createUsosProductos, getAllUsosProductos, updateUsosProductos } from '../controllers/usosProductos.controller.js';
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const usosProductos = Router();

usosProductos.get('/usosProductos',verifyJWT,getAllUsosProductos);
usosProductos.post('/usosProductos',verifyJWT,createUsosProductos);
usosProductos.patch('/usosProductos/:id',verifyJWT,updateUsosProductos);

export default usosProductos;