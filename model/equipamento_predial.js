const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const equipamento_predial = sequelize.define('equipamento_predial', {
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

module.exports = equipamento_predial;
