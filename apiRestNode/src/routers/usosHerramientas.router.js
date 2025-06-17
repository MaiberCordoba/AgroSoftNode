import { Router } from 'express';
import { createUsoHerramientas, getAllUsoHerramientas, updateUsoHerramientas } from '../controllers/usosHerramientas.controller.js';
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const usosHerramientas = Router();

usosHerramientas.get('/usosherramientas',verifyJWT,getAllUsoHerramientas);
usosHerramientas.post('/usosherramientas',verifyJWT,createUsoHerramientas);
usosHerramientas.patch('/usosherramientas/:id',verifyJWT,updateUsoHerramientas);

export default usosHerramientas;