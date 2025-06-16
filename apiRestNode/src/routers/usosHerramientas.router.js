import { Router } from 'express';
import { createUsosHerramientas, getAllUsosHerramientas, updateUsoHerramienta } from '../controllers/usosHerramientas.controller.js';
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const usosHerramientas = Router();

usosHerramientas.get('/usosherramientas',verifyJWT,getAllUsosHerramientas);
usosHerramientas.post('/usosherramientas',verifyJWT,createUsosHerramientas);
usosHerramientas.patch('/usosherramientas/:id',verifyJWT,updateUsoHerramienta);

export default usosHerramientas;