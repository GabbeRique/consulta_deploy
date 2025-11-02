const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const equipamento_br11 = sequelize.define('equipamento_br11', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    }
}, { freezeTableName: true });

module.exports = equipamento_br11;
