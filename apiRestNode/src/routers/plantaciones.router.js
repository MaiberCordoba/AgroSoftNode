import { Router } from "express"
import { ListarPlantaciones, 
        RegistrarPlantaciones, 
        ActualizarPlantaciones, 
        EliminarPlantaciones, 
        BuscarPlantaciones, 
        ListarPlantacionesPorEraYCultivo,
        ListarPlantacionesPorEra,
        ListarPlantacionesPorCultivo,
        ListarPlantacionesPorCultivoYEra,
        } from "../controllers/plantaciones.controller.js"
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const router = Router()

router.get("/plantaciones",verifyJWT, ListarPlantaciones)
router.get("/plantaciones/:id",verifyJWT, BuscarPlantaciones)
router.post("/plantaciones",verifyJWT, RegistrarPlantaciones)
router.put("/plantaciones/:id",verifyJWT, ActualizarPlantaciones)
router.delete("/plantaciones/:id",verifyJWT, EliminarPlantaciones)

router.get("/plantaciones/era/:fk_Eras",verifyJWT, ListarPlantacionesPorEra)
router.get("/plantaciones/cultivo/:fk_Cultivos",verifyJWT, ListarPlantacionesPorCultivo)
router.get("/plantaciones/:fk_Eras/:fk_Cultivos",verifyJWT, ListarPlantacionesPorCultivoYEra)
router.get("/plantaciones/reporte/:fk_Eras/:fk_Cultivos/",verifyJWT, ListarPlantacionesPorEraYCultivo)



export default router