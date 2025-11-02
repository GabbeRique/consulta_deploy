const express = require('express');
const { Login_white } = require('../model/login_white.model'); // Importa o modelo Aluno
const router = express.Router();
const path = require('path');

// Exibe a página de registro
router.get('/', (req, res) => {
    res.render('register_white');
});

// Rota para processar o registro
router.post('/', async (req, res) => {
    const { nome, senha } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await Login_white.create({ nome, senha });
        res.redirect('/login_white');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;