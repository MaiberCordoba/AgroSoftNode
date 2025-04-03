import { Router } from "express";
import { createEvapotranspiraciones, getAllEvapotranspiraciones } from "../controllers/evapotranspiraciones.controller.js";

const evapotranspiraciones = Router()
evapotranspiraciones.get("/evapotranspiraciones",getAllEvapotranspiraciones)
evapotranspiraciones.post("/evapotranspiraciones",createEvapotranspiraciones)

export default evapotranspiraciones;