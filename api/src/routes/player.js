import $register from '#controllers/player/register';
import express from 'express';
const player = express.Router();

player.post('/register', $register);

export default player;