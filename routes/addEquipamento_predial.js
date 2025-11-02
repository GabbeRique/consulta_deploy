const express = require('express');
const equipamento_predial = require('../model/equipamento_predial');
const router = express.Router();

// Exibe a página de registro
router.get('/', (req, res) => {
    res.render('addEquipamento_predial');
});

// Rota para processar o registro
router.post('/', async (req, res) => {
    const { nome } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await equipamento_predial.create({ nome });
        res.redirect('/index_adm_predial');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;
