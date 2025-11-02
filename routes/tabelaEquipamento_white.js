const { EquipamentoWhite, Peca_white } = require('../model/equipamento_white.model');
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); // Importando operadores do Sequelize


router.get('/', async (req, res) => {
    try {
        // Busca todos os equipamentos
        const equipamentos = await EquipamentoWhite.findAll();
        const equipamentosMapeados = equipamentos.map(eq => eq.dataValues);
        res.render('tabelaEquipamento_white', { equipamentos: equipamentosMapeados }); // Adicionada a vírgula aqui
    } catch (error) {
        console.error("Erro ao buscar Equipamento:", error);
        res.status(500).send("Erro ao buscar Equipamento.");
    }
});

module.exports = router;
