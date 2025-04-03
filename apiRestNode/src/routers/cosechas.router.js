import { Router } from "express";
import { createCosechas, getAllCosechas, updateCosechas } from "../controllers/cosechas.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const cosechas = Router()
cosechas.get("/cosechas",verifyJWT,getAllCosechas)
cosechas.post("/cosechas",verifyJWT,createCosechas)
cosechas.put("/cosechas/:id",verifyJWT,updateCosechas)

export default cosechas;