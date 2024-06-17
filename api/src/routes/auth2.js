import $discord from '#controllers/auth2/discord';
import $register from '#controllers/auth2/register';
import express from 'express';
const auth2 = express.Router();

auth2.get('/discord', $discord);
auth2.post('/register', $register)

export default auth2;