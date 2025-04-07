import { Router } from "express";
import {
  getAllLotes,
  getLoteById,
  createLote,
  patchLote,
  deleteLote,
  getLotesByUbicacion,
  getLotesByEstado,
  getLotesByDimensiones
} from "../controllers/lotes.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const lotesRouter = Router();

// CRUD principal
lotesRouter.get("/lotes", verifyJWT, getAllLotes);
lotesRouter.get("/lotes/:id", verifyJWT, getLoteById);
lotesRouter.post("/lotes", verifyJWT, createLote);
lotesRouter.patch("/lotes/:id", verifyJWT, patchLote);
lotesRouter.delete("/lotes/:id", verifyJWT, deleteLote);

// Búsquedas específicas
lotesRouter.get("/lotes/ubicacion/:posX/:posY", verifyJWT, getLotesByUbicacion);
lotesRouter.get("/lotes/estado/:estado", verifyJWT, getLotesByEstado);

// Reportes
lotesRouter.get("/lotes/reporte/dimensiones/:tamX/:tamY", verifyJWT, getLotesByDimensiones);

export default lotesRouter;
