import {Router} from 'express';

import {createCard, deleteCard, getCard, getCards, updateCard} from '../controllers/cards.controller.js';

const router = Router();

router.get('/', getCards);

router.get('/:id', getCard);

router.post('/', createCard);

router.put('/:id', updateCard);

router.delete('/:id', deleteCard);

export default router;