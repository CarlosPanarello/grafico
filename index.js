'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var dados = require('./dados/dadosGraficos.js')

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
        console.log('req.body.result-->' + req.body.result);
        console.log('req.body.result-->' + req.body.result.fulfillment);

        dados.barraVertical(function(resp){ 
            res.json(resp);
            //res.send();
         });

    } catch (err) {
        console.error("Não foi possivel obter a informação", err);
        retornaDadosErro(res,err);
    }
});

restService.get('/',function(req,res){
	res.end('Servidor On');
	console.log('Entrou');
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
