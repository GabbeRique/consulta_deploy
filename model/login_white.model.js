const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const Login_white = sequelize.define('Login_white', {
    timestamps: false,

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'login_white',
    hooks: {
        beforeCreate: async (login_white) => {
            if (login_white.senha) {
                login_white.senha = await bcrypt.hash(login_white.senha, 10);
            }
        },
        beforeUpdate: async (login_white) => {
            if (login_white.changed('senha')) {
                login_white.senha = await bcrypt.hash(login_white.senha, 10);
            }
        }
    }
});

module.exports = { Login_white };
