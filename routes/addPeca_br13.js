const express = require('express');
const equipamento_br13 = require('../model/equipamento_br13');
const peca_br13 = require('../model/peca_br13');


const router = express.Router();

// Exibe a página de registro com os equipamentos
router.get('/', async (req, res) => {
    try {
        const equipamentos = await equipamento_br13.findAll();
        const equipamentosMapeados = equipamentos.map((eq) => eq.dataValues);
        res.render('addPeca_br13', { equipamentos: equipamentosMapeados }); // Passa os equipamentos para a view
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar equipamentos.');
    }
});

router.post('/', async (req, res) => {
    const { equipamento_nome, categoria, nome_peca, SAP } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await peca_br13.create({ equipamento_nome, categoria, nome_peca, SAP });
        res.redirect('/tabelaPeca_br13');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;
