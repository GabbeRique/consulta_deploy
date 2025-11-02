const express = require('express');
const router = express.Router();
const equipamento_predial = require('../model/equipamento_predial');
const peca_predial = require('../model/peca_predial');

// Rota para deletar o equipamento e suas peças associadas
router.get('/:nome', async (req, res) => {
  const equipamentoNome = req.params.nome;

  try {
    // Verifica se o equipamento existe antes de deletar
    const equipamento = await equipamento_predial.findOne({ where: { nome: equipamentoNome } });
    
    if (!equipamento) {
      // Se o equipamento não for encontrado, retorna um erro
      return res.status(404).send('Equipamento não encontrado');
    }

    // Deletar as peças associadas ao equipamento
    await peca_predial.destroy({ where: { equipamento_nome: equipamentoNome } });

    // Deletar o equipamento
    await equipamento_predial.destroy({ where: { nome: equipamentoNome } });

    // Redirecionar após sucesso
    res.redirect('/tabelaEquipamento_predial');  // Redireciona para a tabela de equipamentos

  } catch (error) {
    // Enviar resposta de erro em caso de falha
    console.error("Erro ao deletar:", error);
    res.status(500).send('Erro ao deletar equipamento e peças');
  }
});

module.exports = router;
