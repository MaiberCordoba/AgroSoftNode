import { Router } from "express";
import { createIluminaciones, getAllIluminaciones } from "../controllers/iluminaciones.controller.js";

const iluminaciones = Router()
iluminaciones.get("/iluminaciones",getAllIluminaciones)
iluminaciones.post("/iluminaciones",createIluminaciones)

export default iluminaciones;