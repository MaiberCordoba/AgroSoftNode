import { Router } from "express";
import {
  createActividad,
  getAllActividad,
  reporteRentabilidad,
  updateActividad,
} from "../controllers/actividades.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const actividades = Router();
actividades.get("/actividades", verifyJWT, getAllActividad);
actividades.post("/actividades", verifyJWT, createActividad);
actividades.patch("/actividades/:id",verifyJWT, updateActividad);
actividades.get("/reporteRentabilidad", reporteRentabilidad);

export default actividades;
