import { Router } from "express";
import { createHerramientas, getAllHerramientas, updateHerramientas } from "../controllers/herramientas.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const herramientas = Router()
herramientas.get('/herramientas',verifyJWT,getAllHerramientas)
herramientas.post('/herramientas',verifyJWT,createHerramientas)
herramientas.patch('/herramientas/:id',verifyJWT,updateHerramientas)

export default herramientas;