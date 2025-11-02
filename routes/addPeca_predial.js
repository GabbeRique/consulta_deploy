const express = require('express');
const equipamento_predial = require('../model/equipamento_predial');
const peca_predial = require('../model/peca_predial');


const router = express.Router();

// Exibe a página de registro com os equipamentos
router.get('/', async (req, res) => {
    try {
        const equipamentos = await equipamento_predial.findAll();
        const equipamentosMapeados = equipamentos.map((eq) => eq.dataValues);
        res.render('addPeca_predial', { equipamentos: equipamentosMapeados }); // Passa os equipamentos para a view
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar equipamentos.');
    }
});

router.post('/', async (req, res) => {
    const { equipamento_nome, categoria, nome_peca, SAP } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await peca_predial.create({ equipamento_nome, categoria, nome_peca, SAP });
        res.redirect('/tabelaPeca_predial');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;
