import jwt from 'jsonwebtoken';

require('dotenv').config();

export default (req, res, next) => {
  const token = req.query.verify || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: 'error', message: 'invalid token provided' });
      }
      req.userID = decoded.userID;
      return next();
    });
  } else {
    return res.status(401).send({ status: 'error', message: 'No token provided.' });
  }
  return null;
};
