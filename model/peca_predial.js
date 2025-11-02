const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const equipamento_predial = require('./equipamento_predial'); // Import the equipamento_predial model

const peca_predial = sequelize.define('peca_predial', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipamento_nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
        references: {
            model: equipamento_predial, // Foreign key reference to equipamento_predial
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
equipamento_predial.hasMany(peca_predial, { foreignKey: 'equipamento_nome', targetKey: 'nome', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
peca_predial.belongsTo(equipamento_predial, { foreignKey: 'equipamento_nome', targetKey: 'nome', as: 'equipamentoRef', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = peca_predial;
