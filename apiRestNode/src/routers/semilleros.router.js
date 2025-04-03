import { Router } from "express";
import { createSemilleros, getAllSemilleros, updateSemillero } from "../controllers/semilleros.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const semilleros = Router()
semilleros.get("/semilleros",verifyJWT,getAllSemilleros)
semilleros.post("/semilleros",verifyJWT,createSemilleros)
semilleros.put("/semilleros/:id",verifyJWT,updateSemillero)

export default semilleros;