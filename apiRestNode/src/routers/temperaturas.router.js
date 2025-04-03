import { Router } from "express";
import { createTemperaturas, getAllTemperaturas } from "../controllers/temperaturas.controller.js";

const temperaturas = Router()
temperaturas.get("/temperaturas",getAllTemperaturas)
temperaturas.post("/temperaturas",createTemperaturas)

export default temperaturas;