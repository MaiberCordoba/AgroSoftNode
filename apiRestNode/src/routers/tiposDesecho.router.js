import { Router } from "express";
import { createTiposDesecho, getAllTiposDesecho, updateTiposDesecho } from "../controllers/tiposDesecho.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const tiposDesecho = Router()
tiposDesecho.get("/tipos-desechos",verifyJWT,getAllTiposDesecho)
tiposDesecho.post("/tipos-desechos/",verifyJWT,createTiposDesecho)
tiposDesecho.put("/tipos-desechos/:id",verifyJWT,updateTiposDesecho)

export default tiposDesecho;