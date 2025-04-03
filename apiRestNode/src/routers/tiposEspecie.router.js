import { Router } from "express";
import { createTiposEspecie, getAllTiposEspecie, updateTiposEspecie } from "../controllers/tiposEspecie.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const tiposEspecie = Router()
tiposEspecie.get("/tiposEspecie",verifyJWT,getAllTiposEspecie)
tiposEspecie.post("/tiposEspecie",verifyJWT,createTiposEspecie)
tiposEspecie.put("/tiposEspecie/:id",verifyJWT,updateTiposEspecie)

export default tiposEspecie;