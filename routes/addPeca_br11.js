const express = require('express');
const equipamento_br11 = require('../model/equipamento_br11');
const peca_br11 = require('../model/peca_br11');


const router = express.Router();

// Exibe a página de registro com os equipamentos
router.get('/', async (req, res) => {
    try {
        const equipamentos = await equipamento_br11 .findAll();
        const equipamentosMapeados = equipamentos.map((eq) => eq.dataValues);
        res.render('addPeca_br11', { equipamentos: equipamentosMapeados }); // Passa os equipamentos para a view
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar equipamentos.');
    }
});

router.post('/', async (req, res) => {
    const { equipamento_nome, categoria, nome_peca, SAP } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await peca_br11.create({ equipamento_nome, categoria, nome_peca, SAP });
        res.redirect('/tabelaPeca_br11');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;
