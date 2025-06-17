import { Router } from "express";
import { createTipoDesechos, getAllTipoDesechos, updateTipoDesechos } from "../controllers/tiposDesecho.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const tiposDesecho = Router()
tiposDesecho.get("/tipos-desechos",verifyJWT,getAllTipoDesechos)
tiposDesecho.post("/tipos-desechos/",verifyJWT,createTipoDesechos)
tiposDesecho.patch("/tipos-desechos/:id",verifyJWT,updateTipoDesechos)

export default tiposDesecho;