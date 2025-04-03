import { Router } from "express";
import { createActividad, getAllActividad, updateActividad } from "../controllers/actividades.controller.js";
import  verifyJWT  from "../middlewares/verifyJWT.middleware.js"

const actividades = Router()
actividades.get('/actividad',verifyJWT,getAllActividad)
actividades.post('/actividad',verifyJWT,createActividad)
actividades.put('/actividad/:id',verifyJWT,updateActividad)

export default actividades;