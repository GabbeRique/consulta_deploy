const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); // Importando operadores do Sequelize
const equipamento_br13 = require('../model/equipamento_br13');
const peca_br13 = require('../model/peca_br13');



router.get('/', async (req, res) => {
    try {
        // Busca todos os equipamentos
        const equipamentos = await equipamento_br13.findAll();
        const equipamentosMapeados = equipamentos.map(eq => eq.dataValues);

        // Captura os filtros
        const { equipamento_nome, categoria, nome_peca } = req.query;

        let whereClause = {}; // Objeto de condições do Sequelize

        if (equipamento_nome) {
            whereClause.equipamento_nome = { [Op.like]: `%${equipamento_nome}%` };
        }
        if (categoria) {
            whereClause.categoria = { [Op.like]: `%${categoria}%` };
        }
        if (nome_peca) {
            whereClause.nome_peca = { [Op.like]: `%${nome_peca}%` };
        }

        // Busca as peças filtradas
        const pecas = await peca_br13.findAll({ where: whereClause });

        res.render('tabelaPeca_br13', {
            Pecas: pecas.map(p => p.dataValues),
            equipamentos: equipamentosMapeados,
            equipamento_nome,
            categoria,
            nome_peca
        });

    } catch (error) {
        console.error("Erro ao buscar Peças:", error);
        res.status(500).send("Erro ao buscar Peças.");
    }
});

module.exports = router;
