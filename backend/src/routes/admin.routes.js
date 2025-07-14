import {Router} from 'express';
import { acceptReport, adminContextAuth, declineReport, login, logout, reportedCards } from '../controllers/admin.controller.js';
import { isAuthAdmin } from '../middleware/auth/isAuthAdmin.js';
import { adminLoginValidation } from '../middleware/validations/admin/auth/admin.auth.validation.js';
import { cardIdValidation } from '../middleware/validations/admin/auth/cards/admin.cards.validation.js';
import { analyze } from '../controllers/admin.controller.js';

const router = Router();

router.post('/auth/login', adminLoginValidation, login);

router.post('/auth/logout', isAuthAdmin, logout);

router.get('/auth/me', isAuthAdmin, adminContextAuth);

router.get('/cards/reports', isAuthAdmin, reportedCards);

router.patch('/cards/reports/accept/:id', isAuthAdmin, cardIdValidation, acceptReport);

router.patch('/cards/reports/decline/:id', isAuthAdmin, cardIdValidation, declineReport);

router.post('/cards/analyze', isAuthAdmin, analyze);

export default router;