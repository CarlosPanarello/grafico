
var taxaMensal = 0.85;

var calculoPizza = function(){
    
};

var calculoJurosComposto = function(principal,taxa,periodo){
    // Equacao Montante = montanteInicial * [[1 + (taxa)] ^ qtdPeriodo]
    return (principal * Math.pow(1 + taxa, periodo));
}

var criarItem = function(corItem,corTexto,valorX,valorY){
    var item = new Object();
    item.corItem = corItem;
    item.corTexto = corTexto;
    item.valorX = valorX;
    item.valorY = valorY;
}

var criarConjuntoDado = function(descricao,listaValores){
    var conjuntoDado = new Object();
    conjuntoDado.descricaoConjunto = descricao;
    conjuntoDado.exibirValores = true;
    conjuntoDado.tamanhoTextoItens = 14.0;
    conjuntoDado.tipoFormatacao = 'MONETARIO';
    conjuntoDado.listaValores = listaValores;
}

var calculoBarra = function(montanteInicial,contribuicaoExtra,contribuicaoMensalAtual,contribuicaoMensalSimulado,anoCorrente,anoSaidaAtual,anoSaidaSimulado){
    var periodoSaldoProjetadoPorMes = (anoSaidaAtual - anoCorrente) * 12;
    var periodoSaldoSimuladoPorMes = (anoSaidaSimulado - anoCorrente) * 12;

    var montanteProjetado = 0 + montanteInicial;
    var montanteSimulado = 0 + contribuicaoExtra + montanteInicial;

    for(i = 1; i <= periodoSaldoProjetadoPorMes; i++){
        montanteProjetado = (montanteProjetado *  (1+ (taxaMensal/100)))+ contribuicaoMensalAtual;
    }

    for(i = 1; i <= periodoSaldoSimuladoPorMes; i++){
        montanteSimulado = (montanteSimulado *  (1+ (taxaMensal/100)))+ contribuicaoMensalSimulado;
    }

    var itemProj1 = criarItem(-65536,-16777216,0,0);
    var itemProj2 = criarItem(-65536,-16777216,0,montanteProjetado);
    var listaValoresProj = [itemProj1, itemProj2];
        
    var conjuntoProjetado = criarConjuntoDado('Desc Proj',listaValoresProj);
    
    var itemSim1 = criarItem(-16776961,-16777216,1,0);
    var itemSim2 = criarItem(-16776961,-16777216,1,montanteSimulado);
    var listaValoresSim = [itemSim1, itemSim2];
    
    var conjuntoSimu = criarConjuntoDado('Desc Sim',listaValoresSim);

    var retorno = new Object();
    retorno.conjutoDados = [conjuntoProjetado,conjuntoSimu];
    return retorno;
}

var calculoLinha = function(montanteInicial,contribuicaoExtra,contribuicaoMensal,anoCorrente,anoSaidaAtual,anoSaidaNovo){
    var periodoSaldoProjetadoPorMes = (anoSaidaAtual - anoCorrente);
    var periodoSaldoSimuladoPorMes = (anoSaidaSimulado - anoCorrente);

    var montanteProjetado = 0 + montanteInicial;
    var montanteSimulado = 0 + contribuicaoExtra + montanteInicial;
    
    var listaValoresProj = [];
    listaValoresProj.push(criarItem(-65536,-16777216,0,0));
    
    for(i = 1; i <= periodoSaldoProjetadoPorMes; i++){
        var anual = montanteProjetado;
        for(c = 1; c<=12 ; c++){
            anual = (anual *  (1+ (taxaMensal/100)))+ contribuicaoMensalAtual;
        }
        listaValoresProj.push(criarItem(-65536,-16777216,i,anual));
        montanteProjetado += anual;
    }
    var conjuntoProjetado = criarConjuntoDado('Desc Proj',listaValoresProj);

    var listaValoresSim = [];
    listaValoresSim.push(criarItem(-16776961,-16777216,0,0));
    for(i = 1; i <= periodoSaldoSimuladoPorMes; i++){
        var anual = montanteSimulado;
        for(c = 1; c<=12 ; c++){
            anual = (anual *  (1+ (taxaMensal/100)))+ contribuicaoMensalSimulado;
        }
        listaValoresSim.push(criarItem(-16776961,-16777216,i,anual));
        montanteSimulado += anual;
    }
    var conjuntoSimu = criarConjuntoDado('Desc Sim',listaValoresSim);

    var retorno = new Object();
    retorno.conjutoDados = [conjuntoProjetado,conjuntoSimu];
    return retorno;
}

exports.calcularParaLinha = function(montanteInicial,contribuicaoExtra,contribuicaoMensal,anoCorrente,anoSaidaAtual,anoSaidaNovo,callback){
    callback(calculoLinha(montanteInicial,contribuicaoExtra,contribuicaoMensal,anoCorrente,anoSaidaAtual,anoSaidaNovo));
};

exports.calcularParaBarra = function(montanteInicial,contribuicaoExtra,contribuicaoMensal,anoCorrente,anoSaidaAtual,anoSaidaNovo,callback){
    callback(calculoBarra(montanteInicial,contribuicaoExtra,contribuicaoMensal,anoCorrente,anoSaidaAtual,anoSaidaNovo));
};

exports.calcularParaPizza = function(callback){
    callback(calculoPizza());
};