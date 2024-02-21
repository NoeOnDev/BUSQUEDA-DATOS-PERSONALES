import { User } from '../model/user.model.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export async function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un problema al registrar al usuario. Por favor, inténtalo de nuevo más tarde', error: error.message });
    }
}

export async function loginUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(401).json({ message: 'Contraseña no invalida' });
            return;
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'algotranqui', { expiresIn: '6h' });
        res.json({ message: 'Usuario logueado con éxito', token });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un problema al intentar completar su inicio de sesión. Por favor, inténtalo de nuevo más tarde', error: error.message });
    }
}