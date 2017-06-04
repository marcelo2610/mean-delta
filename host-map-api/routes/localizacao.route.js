/**
 * Created by Marcelo on 27/05/2017.
 */
const express = require('express');
const router = express.Router();
const Localizacao = require('../model/localizacao.model');
const LocalizacaoService = require('../services/localizacao.service');

router.get('/', (req, res, next) => {
    LocalizacaoService.consultar().then((docs)=>{
        res.status(201).json(docs);
    }, (err)=>{
        res.status(500).json(err);
    });
});


router.post('/', (req, res, next) => {
    let localizacao = new Localizacao(req.body);

    LocalizacaoService.salvar(localizacao).then((doc)=>{
        res.status(201).json(doc);
    }, (err)=>{
        res.status(500).json(err);
    });
});

router.put('/', (req, res, next) => {
    let localizacao = new Localizacao(req.body);

    LocalizacaoService
        .atualizar(localizacao)
        .then((doc) => {
            res.status(200).json(doc);
        }, (err) => {
            res.status(500).json(err);
        });
});


router.delete('/', (req, res, next) => {
    LocalizacaoService.excluir(req.param('id')).then(
        (doc) => {res.status(200).json({situacao: "excluido"})},
        (err) => {res.status(500).json(err)}
    );
});
module.exports = router;
