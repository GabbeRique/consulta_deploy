const express = require('express');
const { EquipamentoWhite } = require('../model/equipamento_white.model');
const { Peca_white } = require('../model/peca_white.model'); // Updated import statement

const router = express.Router();

// Exibe a página de registro com os equipamentos
router.get('/', async (req, res) => {
    try {
        const equipamentos = await EquipamentoWhite.findAll();
        const equipamentosMapeados = equipamentos.map((eq) => eq.dataValues);
        res.render('addPeca_white', { equipamentos: equipamentosMapeados }); // Passa os equipamentos para a view
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar equipamentos.');
    }
});

router.post('/', async (req, res) => {
    const { equipamento_nome, categoria, nome_peca, SAP } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await Peca_white.create({ equipamento_nome, categoria, nome_peca, SAP });
        res.redirect('/tabelaPeca_white');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;
