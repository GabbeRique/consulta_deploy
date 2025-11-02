const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {

    const usuarioId = req.session.userId;

    if (usuarioId <= 3) {
        res.render('index_adm_predial');
    } else {
        res.render('index_funcionario_predial');
    }

});

module.exports = router