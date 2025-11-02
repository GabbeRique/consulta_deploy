const express = require('express');
const router = express.Router();
const { Peca_white } = require('../model/peca_white.model'); // Atualizado para usar o nome correto do modelo

// Rota para deletar a peça pelo ID
router.get('/:id', async (req, res) => {
  const pecaId = req.params.id;  // Agora é 'id'

  try {
    // Verifica se a peça existe antes de tentar deletá-la
    const pecaExistente = await Peca_white.findOne({ where: { id: pecaId } });

    if (!pecaExistente) {
      // Se a peça não for encontrada, retorna um erro 404
      return res.status(404).send('Peça não encontrada');
    }

    // Deletar a peça associada pelo ID
    await Peca_white.destroy({ where: { id: pecaId } });

    // Redireciona para a tabela de peças
    res.redirect('/tabelaPeca_white');
    
  } catch (error) {
    // Enviar resposta de erro em caso de falha
    console.error("Erro ao deletar peça:", error);
    res.status(500).send('Erro ao deletar peça');
  }
});

module.exports = router;
