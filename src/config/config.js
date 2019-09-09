require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
  staging: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
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
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
};
