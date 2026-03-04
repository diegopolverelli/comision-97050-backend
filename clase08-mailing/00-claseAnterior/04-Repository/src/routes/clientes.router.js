import { Router } from 'express';
import clientesController from '../controllers/clientesController.js';
export const router=Router()

router.get('/',clientesController.getClientes)