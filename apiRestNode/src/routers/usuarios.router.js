import { Router } from "express";
import {
  getAll,
  create,
  login,
  update,
  getCurrentUser,
  getTotalUsers,
  getOneUsuarios,
} from "../controllers/usuarios.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";
import verifyAdmin from "../middlewares/verifyAdmin.middleware.js";

const router = Router();

router.get("/usuarios", verifyJWT, getAll);
router.get("/usuarios/me", verifyJWT, getCurrentUser);
router.get("/usuarios/:id", verifyJWT, getOneUsuarios);
router.get("/usuarios/reporteUsuarios", getTotalUsers);
router.post("/usuarios", create);
router.post("/login", login);
router.patch("/usuarios/:id", verifyJWT, update);

export default router;
