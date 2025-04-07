import { Router } from "express"

import { ListarSensores, RegistrarSensor, ActualizarSensor, EliminarSensor, ObtenerSensorPorId } from "../controllers/sensores.Controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const router = Router()

router.get("/sensores",verifyJWT, ListarSensores)
router.get("/sensores/:id",verifyJWT, ObtenerSensorPorId)
router.post("/sensores",verifyJWT, RegistrarSensor)
router.put("/sensores/:id",verifyJWT, ActualizarSensor)
router.delete("/sensores/:id", verifyJWT, EliminarSensor)

export default router