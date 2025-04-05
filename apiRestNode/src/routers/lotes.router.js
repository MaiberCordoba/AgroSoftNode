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

router.get("/lote",verifyJWT, ListarLotes)
router.get("/lote/:id",verifyJWT, BuscarLotes)
router.post("/lote",verifyJWT, RegistrarLotes)
router.put("/lote/:id",verifyJWT, ActualizarLotes)
router.delete("/lote/:id",verifyJWT, EliminarLotes)
router.get("/ubicacion/:posX/:posY",verifyJWT, ListarLotesPorUbicacion)
router.get("/lote/estado/:estado",verifyJWT, ListarLotesPorEstado)
router.get("/lote/reporte/:tamX/:tamY",verifyJWT, GenerarReporteLotesPorDimensiones)


export default router