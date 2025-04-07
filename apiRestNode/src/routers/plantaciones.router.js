import { Router } from "express";
import {
  getAllPlantaciones,
  createPlantacion,
  patchPlantacion,
  deletePlantacion,
  getPlantacionById,
  getPlantacionesByEraAndCrop,
  getPlantacionesByEra,
  getPlantacionesByCrop,
  getPlantacionesByCropAndEra
} from "../controllers/plantaciones.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.get("/plantaciones", verifyJWT, getAllPlantaciones);
router.get("/plantaciones/:id", verifyJWT, getPlantacionById);
router.post("/plantaciones", verifyJWT, createPlantacion);
router.patch("/plantaciones/:id", verifyJWT, patchPlantacion);
router.delete("/plantaciones/:id", verifyJWT, deletePlantacion);

router.get("/plantaciones/era/:fk_Eras", verifyJWT, getPlantacionesByEra);
router.get("/plantaciones/cultivo/:fk_Cultivos", verifyJWT, getPlantacionesByCrop);
router.get("/plantaciones/:fk_Eras/:fk_Cultivos", verifyJWT, getPlantacionesByCropAndEra);
router.get("/plantaciones/reporte/:fk_Eras/:fk_Cultivos", verifyJWT, getPlantacionesByEraAndCrop);

export default router;
