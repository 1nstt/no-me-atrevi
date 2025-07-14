import {Router} from 'express';

import {createCard, deleteCard, getCard, getAllActiveCards, getAllCards, getLastestsCards, updateCard, getCardsByTo} from '../controllers/cards.controller.js';
import { createCardValidation } from '../middleware/validations/cards/cards.validations.js';
import { reportCard } from '../controllers/cards.controller.js';
import { validateContent } from '../middleware/validations/cards/wordFilter.js';

const router = Router();

router.get('/', getAllCards);

router.get('/active', getAllActiveCards);

router.get('/lastest', getLastestsCards);

// IMPORTANTE: Esta ruta debe ir ANTES de /:id para evitar conflictos
router.get('/search/:to', getCardsByTo);

router.get('/:id', getCard);

router.post('/', createCardValidation, validateContent, createCard);

router.put('/:id', validateContent, updateCard);

//router.delete('/:id', deleteCard);

router.patch('/report/:id', reportCard);

export default router;