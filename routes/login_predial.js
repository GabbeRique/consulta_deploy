const express = require('express');
const login_predial = require('../model/login_predial'); // Importa o modelo Aluno
const bcrypt = require('bcrypt');
const router = express.Router();

// Exibe a página de login
router.get('/', (req, res) => {
    res.render('login_predial'); // Renderiza o formulário de login
});

// Rota para autenticar o login
router.post('/', async (req, res) => {
    const { nome, senha } = req.body;

    try {
        
        const login_white = await login_predial.findOne({ where: { nome } });

        if (!login_white) {
            return res.status(404).send('Nome não encontrada.');
        }

        // Compara a senha fornecida com o hash salvo
        const senhaValida = await bcrypt.compare(senha, login_white.senha);

        if (!senhaValida) {
            return res.status(401).send('Senha incorreta.');
        }

        
        req.session.userId = login_white.id;
        req.session.usernome = login_white.nome;

        // Redireciona ou envia uma mensagem de sucesso
        res.redirect('/index_adm_predial'); // Mude para onde quiser redirecionar após login
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao fazer login.');
    }
});

module.exports = router;
