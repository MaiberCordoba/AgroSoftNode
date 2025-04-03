import { Router } from "express";
import { createVelocidadViento, getAllVelocidadViento } from "../controllers/velocidadViento.controller.js";

const velocidadViento = Router()
velocidadViento.get("/velocidadViento",getAllVelocidadViento)
velocidadViento.post("/velocidadViento",createVelocidadViento)
export default velocidadViento;