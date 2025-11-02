const express = require('express');
const equipamento_br13 = require('../model/equipamento_br13');
const router = express.Router();

// Exibe a página de registro
router.get('/', (req, res) => {
    res.render('addEquipamento_br13');
});

// Rota para processar o registro
router.post('/', async (req, res) => {
    const { nome } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await equipamento_br13.create({ nome });
        res.redirect('/index_adm_br13');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;
