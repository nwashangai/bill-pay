import bcrypt from 'bcrypt';

export const harsh = token => bcrypt.hash(token, 10);

export default harsh;
