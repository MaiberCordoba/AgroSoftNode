import { Router } from "express";
import { 
  createEspecies, 
  getAllEspecies, 
  patchEspecies, 
  deleteEspecies 
} from "../controllers/especies.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const especies = Router();

especies.get("/especies", verifyJWT, getAllEspecies);
especies.post("/especies", verifyJWT, createEspecies);
especies.patch("/especies/:id", verifyJWT, patchEspecies);  
especies.delete("/especies/:id", verifyJWT, deleteEspecies); 

export default especies;
