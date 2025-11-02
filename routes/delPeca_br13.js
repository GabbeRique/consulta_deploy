const express = require('express');
const router = express.Router();
const peca_br13 = require('../model/peca_br13');

// Rota para deletar a peça pelo ID
router.get('/:id', async (req, res) => {
  const pecaId = req.params.id;  // Agora é 'id'

  try {
    // Verifica se a peça existe antes de tentar deletá-la
    const pecaExistente = await peca_br13.findOne({ where: { id: pecaId } });

    if (!pecaExistente) {
      // Se a peça não for encontrada, retorna um erro 404
      return res.status(404).send('Peça não encontrada');
    }

    // Deletar a peça associada pelo ID
    await peca_br13.destroy({ where: { id: pecaId } });

    // Redireciona para a tabela de peças
    res.redirect('/tabelaPeca_br13');
    
  } catch (error) {
    // Enviar resposta de erro em caso de falha
    console.error("Erro ao deletar peça:", error);
    res.status(500).send('Erro ao deletar peça');
  }
});

module.exports = router;
