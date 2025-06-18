import { Router } from "express";
import {
  createActividad,
  getAllActividad,
  getOneActividad,
  updateActividad,
} from "../controllers/actividades.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const actividades = Router();
actividades.get("/actividades", verifyJWT, getAllActividad);
actividades.get("/actividades/:id", verifyJWT, getOneActividad);
actividades.post("/actividades", verifyJWT, createActividad);
actividades.patch("/actividades/:id",verifyJWT, updateActividad);

export default actividades;
