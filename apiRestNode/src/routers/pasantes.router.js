import { Router } from 'express';
import { getAll, create, regHoras, getHoras } from '../controllers/pasantes.controller.js';

const router = Router();

router.get('/pasantes',getAll);
router.get('/horasmensuales',getHoras);
router.post('/pasantes',create);
router.post('/horasmensuales',regHoras);

export default router;