require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    logging: false,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  test: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    logging: false,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
};
