import { Router } from "express"
import { ListarCultivos, 
        RegistrarCultivos, 
        ActualizarCultivos, 
        EliminarCultivos,
        BuscarCultivo,
        ListarCultivosPorEspecie,
        ListarCultivosPorSiembra,
        ReporteCultivosActivos, } from "../controllers/cultivos.controller.js"
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const router = Router()

router.get("/cultivos",verifyJWT, ListarCultivos)
router.post("/cultivos",verifyJWT, RegistrarCultivos)
router.get("/cultivos/:id",verifyJWT, BuscarCultivo)
router.put("/cultivos/:id",verifyJWT, ActualizarCultivos) 
router.delete("/cultivos/:id",verifyJWT, EliminarCultivos)
router.get("/cultivos/especie/:fk_Especies",verifyJWT, ListarCultivosPorEspecie)
router.get("/cultivos/siembra/:fechaSiembra",verifyJWT, ListarCultivosPorSiembra)
router.get("/reporte/cultivos/activos",verifyJWT, ReporteCultivosActivos)




export default router