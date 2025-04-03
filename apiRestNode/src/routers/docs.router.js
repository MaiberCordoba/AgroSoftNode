import { Router } from "express";
import docsController from "../controllers/docs.controller.js";

const router = Router();

router.get("/docs", docsController);

export default router;
