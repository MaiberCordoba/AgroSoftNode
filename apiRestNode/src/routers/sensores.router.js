import { Router } from "express"

import { ListarSensores, RegistrarSensor, ActualizarSensor, EliminarSensor, ObtenerSensorPorId } from "../controllers/sensores.Controller.js";
//import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const router = Router()

router.get("/sensores", ListarSensores)
router.get("/sensores/:id", ObtenerSensorPorId)
router.post("/sensores", RegistrarSensor)
router.put("/sensores/:id", ActualizarSensor)
router.delete("/sensores/:id", EliminarSensor)

export default router