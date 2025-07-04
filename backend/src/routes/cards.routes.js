import {Router} from 'express';

import {createCard, deleteCard, getCard, getCards, updateCard, getCardsByTo} from '../controllers/cards.controller.js';

const router = Router();

router.get('/', getCards);

// IMPORTANTE: Esta ruta debe ir ANTES de /:id para evitar conflictos
router.get('/search/:to', getCardsByTo);

router.get('/:id', getCard);

router.post('/', createCard);

router.put('/:id', updateCard);

router.delete('/:id', deleteCard);

export default router;