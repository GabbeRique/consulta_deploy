const express = require('express');
const { EquipamentoWhite } = require('../model/equipamento_white.model');
const router = express.Router();

// Exibe a página de registro
router.get('/', (req, res) => {
    res.render('addEquipamento_white');
});

// Rota para processar o registro
router.post('/', async (req, res) => {
    const { nome } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await EquipamentoWhite.create({ nome });
        res.redirect('/index_adm_white');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;
