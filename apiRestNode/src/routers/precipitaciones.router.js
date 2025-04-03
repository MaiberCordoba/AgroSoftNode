import { Router } from "express";
import { createPrecipitaciones, getAllPrecipitaciones } from "../controllers/precipitaciones.controller.js";

const precipitaciones = Router()
precipitaciones.get("/precipitaciones",getAllPrecipitaciones)
precipitaciones.post("/precipitaciones",createPrecipitaciones)

export default precipitaciones; 