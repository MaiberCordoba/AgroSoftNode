import { Router } from "express";
import { 
    getCultivos, 
    postCultivo, 
    patchCultivo, 
    deleteCultivo,
    getCultivoPorId,
    getCultivosPorEspecie,
    getCultivosPorSiembra,
    getReporteCultivosActivos,
} from "../controllers/cultivos.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const router = Router();

router.get("/cultivos", verifyJWT, getCultivos);
router.post("/cultivos", verifyJWT, postCultivo);
router.get("/cultivos/:id", verifyJWT, getCultivoPorId);
router.patch("/cultivos/:id", verifyJWT, patchCultivo);
router.delete("/cultivos/:id", verifyJWT, deleteCultivo);
router.get("/cultivos/especie/:fk_Especies", verifyJWT, getCultivosPorEspecie);
router.get("/cultivos/siembra/:fechaSiembra", verifyJWT, getCultivosPorSiembra);
router.get("/reporte/cultivos/activos", verifyJWT, getReporteCultivosActivos);

export default router;
