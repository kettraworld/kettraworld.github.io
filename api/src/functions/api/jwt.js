import jwt from 'jsonwebtoken';

export const $jwt_sign = (login) => {
 const token = jwt.sign(login, process.env.JWT, { expiresIn: '3d' });
 return token;
};

