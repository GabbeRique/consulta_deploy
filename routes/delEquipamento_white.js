const express = require('express');
const router = express.Router();
const { EquipamentoWhite } = require('../model/equipamento_white.model');
const { Peca_white } = require('../model/peca_white.model');

// Rota para deletar o equipamento e suas peças associadas
router.get('/:nome', async (req, res) => {
  const equipamentoNome = req.params.nome;

  try {
    // Verifica se o equipamento existe antes de deletar
    const equipamento = await EquipamentoWhite.findOne({ where: { nome: equipamentoNome } });
    
    if (!equipamento) {
      // Se o equipamento não for encontrado, retorna um erro
      return res.status(404).send('Equipamento não encontrado');
    }

    // Deletar as peças associadas ao equipamento
    await Peca_white.destroy({ where: { equipamento_nome: equipamentoNome } });

    // Deletar o equipamento
    await EquipamentoWhite.destroy({ where: { nome: equipamentoNome } });

    // Redirecionar após sucesso
    res.redirect('/tabelaEquipamento_white');  // Redireciona para a tabela de equipamentos

  } catch (error) {
    // Enviar resposta de erro em caso de falha
    console.error("Erro ao deletar:", error);
    res.status(500).send('Erro ao deletar equipamento e peças');
  }
});

module.exports = router;
