import { $jwt_sign } from "#functions/api/jwt";
import { $auth2, $user, $guilds, $guild } from "#functions/api/discord";
import user from '#model/user';
import { v4 } from "uuid";
const uuid = v4();
import Joi from 'joi';

const $discord = async (req, res) => {
  
  const discord = await $auth2(req.query.code);
  
  if (!discord.access_token) {
    return res.redirect(process.env.URL_DISCORD)
  };
  
  const user = await $user(`${discord.token_type} ${discord.access_token}`)
 
  const guild = await $guilds(`${discord.token_type} ${discord.access_token}`);

  if (guild.some(x => !x.id === '893997835412971570')) return res.redirect(process.env.INVITE_DISCORD)
 
  const { permissions } = guild.find(x => x.id === '893997835412971570');
  
  const player = await user.findByPk(value.id, { raw: true });
  
  if (!player) {
    
    await user.create({
      id: user.id,
      username: user.username,
      email: user.email,
      token: uuid
    });
    
    res.status(303).redirect(process.env.URL_CALLBACK);

  };
  
  /*
  
  const jwt = await $jwt_sign({
    user: user,
    nickname: null,
    permissions: permissions
  });
  
  res.status(200).json({ jwt });*/
  
};

export default $discord;