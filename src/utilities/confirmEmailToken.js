import jwt from 'jsonwebtoken';

require('dotenv').config();

export const confirmEmailToken = payload => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });

export default confirmEmailToken;
