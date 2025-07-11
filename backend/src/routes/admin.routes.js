import {Router} from 'express';
import { login, reportedCards } from '../controllers/admin.controller.js';
import { isAuthAdmin } from '../middleware/auth/isAuthAdmin.js';

const router = Router();

router.post('/auth/login', login);

router.get('/cards/reports', isAuthAdmin, reportedCards);

export default router;