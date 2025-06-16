import { Router } from "express";
import {
  createActividad,
  getAllActividad,
  graficoActividades,
  reporteCostoActividad,
  reporteRentabilidad,
  updateActividad,
} from "../controllers/actividades.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const actividades = Router();
actividades.get("/actividades", verifyJWT, getAllActividad);
actividades.post("/actividades", createActividad);
actividades.patch("/actividades/:id", updateActividad);
actividades.get("/reporteRentabilidad", reporteRentabilidad);
actividades.get("/graficoActividades", graficoActividades);
actividades.get("/reporteCostoActividad", reporteCostoActividad);

export default actividades;
