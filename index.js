'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var dados = require('./dados/dadosGraficos.js')

var motor = require('./dados/motorCalculo.js')

const restService = express();

restService.use(bodyParser.json());

var retornaDadosErro = function (res,err) {
    console.log('retornaDadosErro res->'+ res);
    console.log('retornaDadosErro err->'+ err);
    res.status(400).json({
        status: {
            code: 400,
            errorType: err.message
        }
    });
    res.send();
}

restService.get('/graficoBarraVertical', function (req, res) {
    console.log('graficoBarraVertical');
    try {
        console.log('req-->' + req);
        console.log('req.body-->' + req.body);
        
        dados.barraVertical(function(resp){ 
            res.json(resp);
         });
    } catch (err) {
        console.error("Não foi possivel obter a informação", err);
        retornaDadosErro(res,err);
    }
});

restService.get('/graficoBarraHorizontal', function (req, res) {
    console.log('graficoBarraHorizontal');
    try {
        console.log('req-->' + req);
        console.log('req.body-->' + req.body);
        
        dados.barraHorizontal(function(resp){ 
            res.json(resp);
         });
    } catch (err) {
        console.error("Não foi possivel obter a informação", err);
        retornaDadosErro(res,err);
    }
});

//https://grafico.herokuapp.com/calculoBarra?montanteInicial=1000.25&contribuicaoExtra=0.50&contribuicaoMensalAtual=100.50&contribuicaoMensalSimulado=150&anoSaidaAtual=2047&anoSaidaSimulado=2060
restService.get('/calculoBarra', function (req, res) {
    console.log('calculoBarra');
    var obj = req.query;
    
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var val = obj[key];
            console.log(key + '-->' + val);
        }
    }
    var montanteInicial = req.query.montanteInicial;
    var contribuicaoExtra = req.query.contribuicaoExtra;
    var contribuicaoMensalAtual = req.query.contribuicaoMensalAtual;
    var contribuicaoMensalSimulado = req.query.contribuicaoMensalSimulado;
    var anoCorrente = 2017;
    var anoSaidaAtual = req.query.anoSaidaAtual;
    var anoSaidaSimulado = req.query.anoSaidaSimulado;

    motor.calcularParaBarra(montanteInicial,contribuicaoExtra,contribuicaoMensalAtual,contribuicaoMensalSimulado,anoCorrente,anoSaidaAtual,anoSaidaSimulado,function(resp){ 
        res.json(resp);
    });
});

restService.get('/calculoLinha', function (req, res) {
    console.log('calculoLinha');
    var obj = req.query;
    
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var val = obj[key];
            console.log(key + '-->' + val);
        }
    }

    var montanteInicial = req.query.montanteInicial;
    var contribuicaoExtra = req.query.contribuicaoExtra;
    var contribuicaoMensalAtual = req.query.contribuicaoMensal;
    var contribuicaoMensalSimulado = req.query.contribuicaoMensalSimulado;
    var anoCorrente = 2017;
    var anoSaidaAtual = req.query.anoSaidaAtual;
    var anoSaidaSimulado = req.query.anoSaidaSimulado;

    motor.calcularParaLinha(montanteInicial,contribuicaoExtra,contribuicaoMensalAtual,contribuicaoMensalSimulado,anoCorrente,anoSaidaAtual,anoSaidaSimulado,function(resp){ 
        res.json(resp);
    });
});

restService.get('/graficoPizza', function (req, res) {
    console.log('graficoPizza');
    try {
        console.log('req-->' + req);
        console.log('req.body-->' + req.body);
        
        dados.pizza(function(resp){ 
            res.json(resp);
         });
    } catch (err) {
        console.error("Não foi possivel obter a informação", err);
        retornaDadosErro(res,err);
    }
});

restService.get('/graficoLinha', function (req, res) {
    console.log('graficoLinha');
    try {
        console.log('req-->' + req);
        console.log('req.body-->' + req.body);
        
        dados.linha(function(resp){ 
            res.json(resp);
         });
    } catch (err) {
        console.error("Não foi possivel obter a informação", err);
        retornaDadosErro(res,err);
    }
});


restService.get('/',function(req,res){
	res.end('Servidor On');
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
