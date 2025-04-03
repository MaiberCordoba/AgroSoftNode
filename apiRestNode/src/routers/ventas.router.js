import { Router } from "express";
import { createVentas, getAllVentas, updateVentas } from "../controllers/ventas.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const ventas = Router()
ventas.get("/ventas",verifyJWT,getAllVentas)
ventas.post("/ventas",verifyJWT,createVentas)
ventas.put("/ventas/:id",verifyJWT,updateVentas)

export default ventas;