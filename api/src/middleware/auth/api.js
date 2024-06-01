import jwt from 'jsonwebtoken';

const $auth = (req, res, next) => {
  
 const auth = req.headers["authorization"];
 
 if (!auth) return res.status(404).json({ message: 'Access denied;' })

 jwt.verify(auth, process.env.JWT, (err, user) => {
    
  if (err) return res.status(404).json({ message: 'Invalid or expired token' });
   
  req.user = user;
  next();
  
 });
  
};

export default $auth;