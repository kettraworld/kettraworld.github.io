import { $auth2, $user, $guilds } from "#functions/api/discord";
import { $jwt_sign } from "#functions/api/jwt";
import { register } from '#email/register';
import logger from "#functions/logger";
import { v4 as uuidv4 } from "uuid";
import User from '#model/user';
import email from "#email";
import Joi from 'joi';

const $discord = async (req, res) => {
  
  const uuid = uuidv4();
  
  try {

    if (!req.query.code) return res.redirect(process.env.URL_DISCORD);
    
    const discord = await $auth2(req.query.code);
   
    if (!discord.access_token) return res.redirect(process.env.URL_DISCORD);
    
    const _user = await $user(`${discord.token_type} ${discord.access_token}`);
    
    const guilds = await $guilds(`${discord.token_type} ${discord.access_token}`);

    const guild = guilds.find(x => x.id === '893997835412971570');
    
    if (!guild) return res.redirect(process.env.INVITE_DISCORD);

    const { permissions } = guild;

    const player = await User.findOne({ where: { id: _user.id }, raw: true });

    if (!player) {
      player = await User.create({
        id: _user.id,
        username: _user.username,
        email: _user.email,
        token: uuid
      });
      
     await email.sendMail({
       from: 'kettraworld@gmail.com',
       to: _user.email,
       subject: 'Bem vindo ao servidor!',
       html: await register(_user.username, uuid)
     });
     
      return res.status(303).redirect(process.env.URL_CALLBACK);
      
    };
    
    if (!player.nick) {
     await email.sendMail({
       from: 'kettraworld@gmail.com',
       to: _user.email,
       subject: 'Bem vindo ao servidor!',
       html: await register(_user.username, player.token)
     });
     
      return res.status(303).redirect(process.env.URL_CALLBACK);
    };

    const jwt = await $jwt_sign({
      user: _user,
      nickname: player.nick,
      permissions
    });

    return res.status(303).redirect(process.env.URL_LOGIN + jwt);

  } catch (err) {
    logger.error(err.message);
    res.status(505).json({ err: e.message });
  }
};

export default $discord;