import {body, param, validationResult} from 'express-validator';

export const createCardValidation = [
    body('to')
        .notEmpty()
        .withMessage('El campo "to" es requerido')
        .isString()
        .withMessage('El campo "to" debe ser un texto')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('El campo "to" debe tener entre 1 y 100 caracteres'),
    
    body('message')
        .notEmpty()
        .withMessage('El campo "message" es requerido')
        .isString()
        .withMessage('El campo "message" debe ser un texto')
        .trim()
        .isLength({ min: 1, max: 250 })
        .withMessage('El mensaje debe tener entre 1 y 250 caracteres'),

    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
