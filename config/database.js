// config/database.js
const { Sequelize } = require('sequelize');
const path = require('path');

if (process.env.DATABASE_URL) {
  // Para Postgres (Render, Railway, Heroku etc.)
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    }
  });
} else {
  // Fallback para sqlite local (útil para desenvolvimento)
  module.exports = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'),
    logging: false
  });
}