import { Router } from 'express';
import { authenticateToken } from '../middlewares/authToken.js';
import { getPeople, searchPeopleForName, searchPeopleForEmail } from '../controllers/people.controller.js';

const r = Router();

r.get('/people', getPeople);
r.get('/people/search', authenticateToken, searchPeopleForName);
r.get('/people/search/email', authenticateToken, searchPeopleForEmail);

export default r;