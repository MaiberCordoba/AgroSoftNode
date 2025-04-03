import { Router } from "express"
import { ListarHumedad, RegistrarHumedad,ActualizarHumedad, EliminarHumedad,BuscarHumedad
}from "../controllers/humedadTerreno.controller.js"
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const router = Router()

router.get("/humedadTerreno",verifyJWT, ListarHumedad)
router.post("/humedadTerreno",verifyJWT, RegistrarHumedad)
router.put("/humedadTerreno/:id",verifyJWT, ActualizarHumedad)
router.delete("/humedadTerreno/:id",verifyJWT, EliminarHumedad)
router.get("/humedadTerreno/:id",verifyJWT, BuscarHumedad)


export default router