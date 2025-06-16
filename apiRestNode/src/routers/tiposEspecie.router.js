import { Router } from "express";
import {
  getAllTiposEspecie,
  createTiposEspecie,
  updateTiposEspecie,
  deleteTiposEspecie
} from "../controllers/tiposEspecie.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const tiposEspecie = Router();

tiposEspecie.get("/tiposEspecie", verifyJWT, getAllTiposEspecie);
tiposEspecie.post("/tiposEspecie", verifyJWT, createTiposEspecie);
tiposEspecie.patch("/tiposEspecie/:id", verifyJWT, updateTiposEspecie); 
tiposEspecie.delete("/tiposEspecie/:id", verifyJWT, deleteTiposEspecie);

export default tiposEspecie;
