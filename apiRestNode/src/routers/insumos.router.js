import { Router } from "express";
import { createInsumo, getAllInsumos, updateInsumos } from "../controllers/insumos.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const insumos = Router()
insumos.get("/insumos",verifyJWT,getAllInsumos)
insumos.post("/insumos",verifyJWT,createInsumo)
insumos.put("/insumos/:id",verifyJWT,updateInsumos)

export default insumos;