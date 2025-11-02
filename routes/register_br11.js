const express = require('express');
const login_br11 = require('../model/login_br11'); // Importa o modelo Aluno


const router = express.Router();
const path = require('path');

// Exibe a página de registro
router.get('/', (req, res) => {
    res.render('register_br11');
});

// Rota para processar o registro
router.post('/', async (req, res) => {
    const { nome, senha } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await login_br11.create({ nome, senha });
        res.redirect('/login_br11');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});


module.exports = router;
