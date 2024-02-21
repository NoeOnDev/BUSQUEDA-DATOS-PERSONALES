import { body } from 'express-validator';

export const registerAndLoginUserValidation = [
    body('email')
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('El email no es válido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 8, max: 15 })
        .withMessage('La contraseña debe tener entre 8 y 15 caracteres')
        .matches(/[A-Z]/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[a-z]/)
        .withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/[0-9]/)
        .withMessage('La contraseña debe contener al menos un dígito')
        .matches(/[!@#$%^&*]/)
        .withMessage('La contraseña debe contener al menos un caracter especial: !@#$%^&*')
        .not()
        .matches(/\s/)
        .withMessage('La contraseña no debe contener espacios en blanco'),
];