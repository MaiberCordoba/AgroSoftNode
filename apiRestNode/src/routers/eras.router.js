import { Router } from "express";
import {
  getAllEras,
  getEraById,
  createEra,
  patchEra,
  deleteEra,
  getErasByLoteId,
} from "../controllers/eras.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.get("/eras", verifyJWT, getAllEras);
router.get("/eras/:id", verifyJWT, getEraById);
router.post("/eras", verifyJWT, createEra);
router.patch("/eras/:id", verifyJWT, patchEra); // ← PATCH en vez de PUT
router.delete("/eras/:id", verifyJWT, deleteEra);
router.get("/eras/reporte/:id", verifyJWT, getErasByLoteId);

export default router;
