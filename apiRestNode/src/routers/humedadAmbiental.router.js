import { Router } from "express";
import { createHumedadAmbiental, getAllHumedadAmbiental } from "../controllers/humedadAmbiental.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const humedadAmbiental = Router();

humedadAmbiental.get("/humedadAmbiental",verifyJWT, getAllHumedadAmbiental)
humedadAmbiental.post("/humedadAmbiental",verifyJWT, createHumedadAmbiental)



export default humedadAmbiental;