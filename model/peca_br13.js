const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const equipamento_br13 = require('./equipamento_br13'); // Import the equipamento_br13 model

const peca_br13 = sequelize.define('peca_br13', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipamento_nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
        references: {
            model: equipamento_br13, // Foreign key reference to equipamento_br13
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
equipamento_br13.hasMany(peca_br13, { foreignKey: 'equipamento_nome', targetKey: 'nome', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
peca_br13.belongsTo(equipamento_br13, { foreignKey: 'equipamento_nome', targetKey: 'nome', as: 'equipamentoRef', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = peca_br13;
