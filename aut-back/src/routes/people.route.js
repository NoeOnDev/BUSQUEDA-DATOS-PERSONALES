import { Router } from 'express';
import { getPeople, searchPeopleForName, searchPeopleForEmail } from '../controllers/people.controller.js';

const r = Router();

r.get('/people', getPeople);
r.get('/people/search', searchPeopleForName);
r.get('/people/search/email', searchPeopleForEmail);

export default r;