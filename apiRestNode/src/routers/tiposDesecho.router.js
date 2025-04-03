import { Router } from "express";
import { createTiposDesecho, getAllTiposDesecho, updateTiposDesecho } from "../controllers/tiposDesecho.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const tiposDesecho = Router()
tiposDesecho.get("/tiposDesecho",verifyJWT,getAllTiposDesecho)
tiposDesecho.post("/tiposDesecho",verifyJWT,createTiposDesecho)
tiposDesecho.put("/tiposDesecho/:id",verifyJWT,updateTiposDesecho)

export default tiposDesecho;