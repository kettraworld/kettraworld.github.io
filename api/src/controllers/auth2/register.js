import { plugin } from "#db/sequelize";
import { v4 as uuidv4 } from "uuid";
import User from '#model/user';
import Joi from 'joi';

const $register = async (req, res) => {
  
  const uuid = uuidv4();
  
  const schema = Joi.object({
   token: Joi.string().required(),
   nickname: Joi.string().required(),
   password: Joi.string().required(),
  });
  
  const { error, value } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  
  const player = await User.findOne({ where: { token: value.token }, raw: true });
  
  if (!player) {
    return res.status(404).json({ err: 'token not registered' })
  }
  
  plugin.register({ nickname: value.nickname, password: value.password, email: player.email, discord: player.id }, async (nlogin) => {
    
    if (!nlogin) {
      res.status(203).json({ err: 'nickname already registered'})
    };
    
    await User.update({ token: uuid, nick: value.nickname }, { where: { token: value.token } });

    res.status(200).json({ message: 'nickname successfully registered'});
  
});

  
  
};

export default $register;