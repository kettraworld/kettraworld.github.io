import { $jwt_sign } from "#functions/api/jwt";
import { $auth2, $user, $guilds } from "#functions/api/discord";
import User from '#model/user';
import { v4 as uuidv4 } from "uuid";
import Joi from 'joi';

const $discord = async (req, res) => {
  
  try {

    if (!req.query.code) return res.redirect(process.env.URL_DISCORD);
    
    const discord = await $auth2(req.query.code);

    if (!discord.access_token) return res.redirect(process.env.URL_DISCORD);
    
    const _user = await $user(`${discord.token_type} ${discord.access_token}`);
    
    const guilds = await $guilds(`${discord.token_type} ${discord.access_token}`);

    const guild = guilds.find(x => x.id === '893997835412971570');
    
    if (!guild) return res.redirect(process.env.INVITE_DISCORD);

    const { permissions } = guild;

    let player = await User.findOne({ where: { id: _user.id }, raw: true });
    
    console.log(player);

    if (!player) {
      player = await User.create({
        id: _user.id,
        username: _user.username,
        email: _user.email,
        token: uuidv4()
      });
      
      return res.status(303).redirect(process.env.URL_CALLBACK);
      
    };

    const jwt = await $jwt_sign({
      user: _user,
      nickname: null,
      permissions
    });

    return res.status(200).json({ jwt });

  } catch (err) {
    console.error('Erro no processo de autenticação do Discord:', err);
  }
};

export default $discord;