import { Router } from 'express';
import { createCustomer, getCustomers } from '../controllers/CustomersController.js';
export const router=Router()

router.get('/', getCustomers)
router.post('/', createCustomer)