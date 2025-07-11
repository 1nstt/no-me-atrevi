import {body, param, validationResult} from 'express-validator';

export const adminLoginValidation = [
    body('password')
        .notEmpty()
        .withMessage('El campo "password" es requerido')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('El campo debe tener entre 1 y 200 caracteres'),

    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];