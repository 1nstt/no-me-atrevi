import {body, param, validationResult} from 'express-validator';

export const cardIdValidation = [
    param('id')
        .notEmpty()
        .withMessage('El campo "id" es requerido')
        .trim()
        .isMongoId()
        .withMessage('El ID debe ser un ObjectId válido de MongoDB'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];