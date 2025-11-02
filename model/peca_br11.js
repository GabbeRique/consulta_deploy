const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const equipamento_br11 = require('./equipamento_br11'); // Import the equipamento_br11 model

const peca_br11 = sequelize.define('peca_br11', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipamento_nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
        references: {
            model: equipamento_br11, // Foreign key reference to equipamento_br11
            key: 'nome'
        }
    },
    categoria: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    nome_peca: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    SAP: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: true,
    },
}, { freezeTableName: true });

// Define associations
equipamento_br11.hasMany(peca_br11, { foreignKey: 'equipamento_nome', targetKey: 'nome', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
peca_br11.belongsTo(equipamento_br11, { foreignKey: 'equipamento_nome', targetKey: 'nome', as: 'equipamentoRef', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = peca_br11;
