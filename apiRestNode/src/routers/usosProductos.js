import { Router } from "express";
import { createUsoInsumos, getAllUsoInsumos, updateUsoInsumos } from '../controllers/usosProductos.controller.js';
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const usosProductos = Router();

usosProductos.get('/usosProductos',verifyJWT,getAllUsoInsumos);
usosProductos.post('/usosProductos',verifyJWT,createUsoInsumos);
usosProductos.patch('/usosProductos/:id',verifyJWT,updateUsoInsumos);

export default usosProductos;