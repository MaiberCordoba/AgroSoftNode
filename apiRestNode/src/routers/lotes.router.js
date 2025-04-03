import { Router } from "express" 
import { ListarLotes, 
        RegistrarLotes, 
        ActualizarLotes, 
        EliminarLotes, 
        BuscarLotes,
        ListarLotesPorUbicacion,
        ListarLotesPorEstado,
        GenerarReporteLotesPorDimensiones,
        } from "../controllers/lotes.controller.js"
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const router = Router()

router.get("/lotes",verifyJWT, ListarLotes)
router.get("/lotes/:id",verifyJWT, BuscarLotes)
router.post("/lotes",verifyJWT, RegistrarLotes)
router.put("/lotes/:id",verifyJWT, ActualizarLotes)
router.delete("/lotes/:id",verifyJWT, EliminarLotes)
router.get("/ubicacion/:posX/:posY",verifyJWT, ListarLotesPorUbicacion)
router.get("/lotes/estado/:estado",verifyJWT, ListarLotesPorEstado)
router.get("/lotes/reporte/:tamX/:tamY",verifyJWT, GenerarReporteLotesPorDimensiones)


export default router