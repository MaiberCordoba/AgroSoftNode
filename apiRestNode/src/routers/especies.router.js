import { Router } from "express";
import { createEspecies, getAllEspecies, updateEspecies } from "../controllers/especies.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const especies = Router()
especies.get("/especies",verifyJWT,getAllEspecies)
especies.post("/especies",verifyJWT,createEspecies)
especies.put("/especies/:id",verifyJWT,updateEspecies)

export default especies;