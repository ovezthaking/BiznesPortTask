import { body } from 'express-validator'

export default validateMessage = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Wiadomość nie może być pusta')
        .isLength({ min:1, max: 1000 })
        .withMessage('Maksymalna ilość znaków dla wiadomosci to 1000')
]
