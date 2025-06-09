import { Router } from 'express';
import {
    RegistrarUmbral,
    ListarUmbrales,
    ActualizarUmbral,
    EliminarUmbral
} from '../controllers/umbral.controller.js';

const router = Router();

router.get('/umbral', ListarUmbrales);
router.post('/umbral', RegistrarUmbral);
router.put('/umbral/:id', ActualizarUmbral);
router.delete('/umbral/:id', EliminarUmbral);

export default router;
