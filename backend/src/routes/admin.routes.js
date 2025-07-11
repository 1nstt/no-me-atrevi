import {Router} from 'express';
import { login, reportedCards } from '../controllers/admin.controller.js';
import { isAuthAdmin } from '../middleware/auth/isAuthAdmin.js';
import { adminLoginValidation } from '../middleware/validations/admin/auth/admin.auth.validation.js';

const router = Router();

router.post('/auth/login', adminLoginValidation, login);

router.get('/cards/reports', isAuthAdmin, reportedCards);

export default router;