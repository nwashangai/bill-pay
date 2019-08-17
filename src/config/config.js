require('dotenv').config();

module.exports = {
	development: {
		// username: process.env.POSTGRES_USER,
		// password: process.env.POSTGRES_PASSWORD,
		// database: process.env.POSTGRES_DB,
		// host: process.env.DB_HOST,
		// logging: false,
		// port: process.env.DB_PORT,
		// dialect: 'postgres',
		dialect: 'postgres',
		use_env_variable: 'DATABASE_URL',
	},
	test: {
		dialect: 'postgres',
		use_env_variable: 'DATABASE_URL',
	},
	production: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		host: process.env.DB_HOST,
		logging: false,
		port: process.env.DB_PORT,
		dialect: 'postgres',
	},
};
