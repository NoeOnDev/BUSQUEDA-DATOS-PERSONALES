import express from 'express';
import cors from 'cors';
import peopleRoutes from '../routes/people.route.js';
import userRoutes from '../routes/user.route.js';
import { connect } from '../database/database.config.js';
import { People } from '../model/people.model.js';
import { User } from '../model/user.model.js';

export async function createServer() {
    try {
        const PORT = 3000;
        const app = express();

        await connect();

        app.use(express.json());
        app.use(cors());    
        app.use(peopleRoutes);
        app.use(userRoutes);
        app.listen(PORT);
    } catch (error) {
        console.error('Error creating server', error);
    }
}