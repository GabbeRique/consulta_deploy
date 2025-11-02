const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { EquipamentoWhite } = require('./equipamento_white.model');  // Corrigido o caminho aqui

const Peca_white = sequelize.define('Peca_white', {
    timestamps: false,

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipamento_nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
        references: {
            model: EquipamentoWhite,
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
});

// Definição das associações
EquipamentoWhite.hasMany(Peca_white, { foreignKey: 'equipamento_nome', targetKey: 'nome', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Peca_white.belongsTo(EquipamentoWhite, { foreignKey: 'equipamento_nome', targetKey: 'nome', as: 'equipamentoRef', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = { Peca_white };
