const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {

    const usuarioId = req.session.userId;

    if (usuarioId <= 3) {
        res.render('index_adm_br11');
    } else {
        res.render('index_funcionario_br11');
    }

});

module.exports = router