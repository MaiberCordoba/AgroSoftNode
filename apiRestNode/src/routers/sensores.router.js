import { Router } from "express"

import { ListarSensores, RegistrarSensor, ActualizarSensor, EliminarSensor, ObtenerSensorPorId, ObtenerHistoricoSensor } from "../controllers/sensores.Controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const router = Router()

router.get("/sensores",verifyJWT, ListarSensores)
router.get("/sensores/:id",verifyJWT, ObtenerSensorPorId)
router.post("/sensores",verifyJWT, RegistrarSensor)
router.put("/sensores/:id",verifyJWT, ActualizarSensor)
router.delete("/sensores/:id", verifyJWT, EliminarSensor)
router.get('/sensores/historico/:id', verifyJWT, ObtenerHistoricoSensor);

export default router