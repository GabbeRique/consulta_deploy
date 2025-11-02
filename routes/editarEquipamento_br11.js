const express = require('express');
const equipamento_br11 = require('../model/equipamento_br11');
const router = express.Router();

// Rota para exibir o formulário de edição
router.get('/:id', async (req, res) => {
    const equipamentoId = req.params.id;
    console.log(`Buscando equipamento com ID: ${equipamentoId}`);

    try {
        const equipamentoEncontrado = await equipamento_br11.findByPk(equipamentoId);
        console.log("Equipamento encontrado:", equipamentoEncontrado); // Adiciona um log para verificar

        if (!equipamentoEncontrado) {
            console.log("Nenhum equipamento encontrado no banco.");
            return res.status(404).send('Equipamento não encontrado.');
        }

        res.render('editarEquipamento_br11', { equipamento: equipamentoEncontrado.toJSON() });
    } catch (error) {
        console.error("Erro ao buscar equipamento:", error);
        res.status(500).send('Erro ao buscar o equipamento.');
    }
});

// Rota para atualizar o equipamento no banco de dados
router.post('/:id', async (req, res) => {
    const equipamentoId = req.params.id;
    const { nome } = req.body;

    console.log(`Recebendo atualização para ID: ${equipamentoId}, Nome: ${nome}`); // Depuração

    try {
        const equipamentoEncontrado = await equipamento_br11.findByPk(equipamentoId); // Correção aqui

        if (!equipamentoEncontrado) {
            return res.status(404).send('Equipamento não encontrado.');
        }

        // Atualiza o nome
        await equipamentoEncontrado.update({ nome });

        res.redirect('/tabelaEquipamento_br11'); // Redireciona para a lista de equipamentos
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o equipamento.');
    }
});

module.exports = router;
