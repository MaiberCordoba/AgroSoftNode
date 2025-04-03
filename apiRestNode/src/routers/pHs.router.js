import { Router } from "express"

import { ListarPhs, RegistrarPhs, ActualizarPhs, EliminarPhs, BuscarPhs } from "../controllers/pHs.controller.js"
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const router = Router()

router.get("/pHs",verifyJWT, ListarPhs)
router.get("/pHs/:id",verifyJWT, BuscarPhs)
router.post("/pHs",verifyJWT, RegistrarPhs)
router.put("/pHs/:id",verifyJWT, ActualizarPhs)
router.delete("/pHs/:id",verifyJWT, EliminarPhs)


export default router