import { body } from 'express-validator'

export const validateMessage = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Wiadomość nie może być pusta')
        .isLength({ min:1, max: 1000 })
        .withMessage('Ilość znaków musi mieścić się w przedziale 1-1000')
]
