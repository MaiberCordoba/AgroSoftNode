import { Router } from "express";
import { createSemilleros, getAllSemilleros, patchSemillero, deleteSemillero } from "../controllers/semilleros.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const semilleros = Router()
semilleros.get("/semilleros",verifyJWT,getAllSemilleros)
semilleros.post("/semilleros",verifyJWT,createSemilleros)
semilleros.patch("/semilleros/:id",verifyJWT,patchSemillero)
semilleros.delete("/semilleros/:id",verifyJWT,deleteSemillero)

export default semilleros;