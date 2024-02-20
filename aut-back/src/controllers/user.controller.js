import { User } from '../model/user.model.js';
import { validationResult } from 'express-validator';
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
        res.status(500).json({ message: 'Error registering user', error: error.message });
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
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}