import {Router} from 'express';
import { acceptReport, declineReport, login, reportedCards } from '../controllers/admin.controller.js';
import { isAuthAdmin } from '../middleware/auth/isAuthAdmin.js';
import { adminLoginValidation } from '../middleware/validations/admin/auth/admin.auth.validation.js';
import { cardIdValidation } from '../middleware/validations/admin/auth/cards/admin.cards.validation.js';

const router = Router();

router.post('/auth/login', adminLoginValidation, login);

router.get('/cards/reports', isAuthAdmin, reportedCards);

router.patch('/cards/reports/accept/:id', isAuthAdmin, cardIdValidation, acceptReport);

router.patch('/cards/reports/decline/:id', isAuthAdmin, cardIdValidation, declineReport);

export default router;