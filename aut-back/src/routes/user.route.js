import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import { registerAndLoginUserValidation } from '../validator/user.validator.js';

const r = Router();

r.post('/register', registerAndLoginUserValidation, registerUser);
r.post('/login', registerAndLoginUserValidation, loginUser);

export default r;