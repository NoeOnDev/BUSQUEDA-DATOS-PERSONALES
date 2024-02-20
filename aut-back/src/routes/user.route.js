import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import { registerUserValidation } from '../validator/user.validator.js';

const r = Router();

r.post('/register', registerUserValidation, registerUser);
r.post('/login', registerUserValidation, loginUser);

export default r;