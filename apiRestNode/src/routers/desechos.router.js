import { Router } from "express";
import { getAllDesechos, createDesechos, updateDesechos } from "../controllers/desechos.controller.js";
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const desechos = Router()
desechos.get("/desechos",verifyJWT,getAllDesechos)
desechos.post("/desechos",verifyJWT,createDesechos)
desechos.put("/desechos/:id",verifyJWT,updateDesechos)

export default desechos;