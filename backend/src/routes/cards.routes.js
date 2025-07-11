import {Router} from 'express';

import {createCard, deleteCard, getCard, getCards, getLastestsCards, updateCard, getCardsByTo} from '../controllers/cards.controller.js';
import { createCardValidation } from '../middleware/validations/cards/cards.validations.js';
import { reportCard } from '../controllers/cards.controller.js';

const router = Router();

router.get('/', getCards);

router.get('/lastest', getLastestsCards);

// IMPORTANTE: Esta ruta debe ir ANTES de /:id para evitar conflictos
router.get('/search/:to', getCardsByTo);

router.get('/:id', getCard);

router.post('/', createCardValidation, createCard);

router.put('/:id', updateCard);

router.delete('/:id', deleteCard);

router.patch('/report/:id', reportCard);

export default router;