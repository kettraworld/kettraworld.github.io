import $discord from '#controllers/auth2/discord';
import express from 'express';
const auth2 = express.Router();

auth2.get('/discord', $discord);

export default auth2;