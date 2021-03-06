var calculoPizza = function(){

};

var calculoJurosComposto = function(principal,taxa,periodo){
    // Equacao Montante = montanteInicial * [[1 + (taxa)] ^ qtdPeriodo]
    return (principal * Math.pow(1 + taxa, periodo));
}

var item = function(corItem,corTexto,valorX,valorY){
    this.corItem = corItem;
    this.corTexto = corTexto;
    this.valorX = valorX;
    this.valorY = valorY;
}

var conjuntoDado = function(descricao,listaValores){
    this.descricaoConjunto = descricao;
    this.exibirValores = true;
    this.tamanhoTextoItens = 14.0;
    this.tipoFormatacao = 'MONETARIO';
    this.listaValores = listaValores;
}

var descricaoConstrutor = function(descricao){
    this.alinhamento = 'CENTER';
    this.cor = -16777216;
    this.habilitar = true;
    this.posicaoEixoX = 0;
    this.posicaoEixoY = 0;
    this.tamanhoFonte = 15;
    this.texto = descricao;
}

var linhaLimite = function(desc,valorLimite){
    this.corLinha = -65536;
    this.espessuraLinha = 'FINO';
    this.habilitado = true;
    this.tipoPontilhado = 'LONGO';
    this.tipoPosicaoDescricao = 'RIGHT_TOP';
    this.valorLimite = valorLimite;
    this.descricao = new descricaoConstrutor(desc);
}

var calculoBarra = function(montanteInicial,contribuicaoExtra,contribuicaoMensalAtual,contribuicaoMensalSimulado,anoCorrente,anoSaidaAtual,anoSaidaSimulado){
    var periodoSaldoProjetadoPorMes = (anoSaidaAtual - anoCorrente) * 12;
    var periodoSaldoSimuladoPorMes = (anoSaidaSimulado - anoCorrente) * 12;

    montanteInicial = Number(montanteInicial);
    contribuicaoExtra = Number(contribuicaoExtra);
    contribuicaoMensalAtual = Number(contribuicaoMensalAtual);
    contribuicaoMensalSimulado = Number(contribuicaoMensalSimulado);

    var montanteProjetado = montanteInicial;
    var montanteSimulado = contribuicaoExtra + montanteInicial;

    var taxaMensal = 0.85;

    console.log('periodoSaldoProjetadoPorMes-->' + periodoSaldoProjetadoPorMes);
    console.log('periodoSaldoSimuladoPorMes-->' + periodoSaldoSimuladoPorMes);
    console.log('montanteProjetado-->' + montanteProjetado);
    console.log('montanteSimulado-->' + montanteSimulado);
    console.log('contribuicaoMensalAtual-->' + contribuicaoMensalAtual);

    for(i = 1; i <= periodoSaldoProjetadoPorMes; i++){
        montanteProjetado = (montanteProjetado *  (1+ (taxaMensal/100)))+ contribuicaoMensalAtual;
    }

    for(i = 1; i <= periodoSaldoSimuladoPorMes; i++){
        montanteSimulado = (montanteSimulado *  (1+ (taxaMensal/100)))+ contribuicaoMensalSimulado;
    }

    console.log('montanteProjetado-->' + montanteProjetado.toFixed(2) );
    console.log('montanteSimulado-->' + montanteSimulado.toFixed(2) );

    var itemProj1 = new item(-65536,-16777216,0,0);
    var itemProj2 = new item(-65536,-16777216,0,montanteProjetado.toFixed(2));

    console.log('itemProj1-->' + itemProj1 );
    console.log('itemProj2-->' + itemProj2 );

    var listaValoresProj = [itemProj1, itemProj2];
        
    var conjuntoProjetado = new conjuntoDado('Desc Proj',listaValoresProj);
    
    var itemSim1 = new item(-16776961,-16777216,1,0);
    var itemSim2 = new item(-16776961,-16777216,1,montanteSimulado.toFixed(2));
    var listaValoresSim = [itemSim1, itemSim2];
    
    var conjuntoSimu = new conjuntoDado('Desc Sim',listaValoresSim);

    var retorno = new Object();
    retorno.conjutoDados = [conjuntoProjetado,conjuntoSimu];
    return retorno;
}

var calculoLinha = function(montanteInicial,contribuicaoExtra,contribuicaoMensalAtual,contribuicaoMensalSimulado,anoCorrente,anoSaidaAtual,anoSaidaSimulado){
    var periodoSaldoProjetadoPorMes = (anoSaidaAtual - anoCorrente);
    var periodoSaldoSimuladoPorMes = (anoSaidaSimulado - anoCorrente);

    montanteInicial = Number(montanteInicial);
    contribuicaoExtra = Number(contribuicaoExtra);
    contribuicaoMensalAtual = Number(contribuicaoMensalAtual);
    contribuicaoMensalSimulado = Number(contribuicaoMensalSimulado);

    var montanteProjetado = montanteInicial;
    var montanteSimulado = contribuicaoExtra + montanteInicial;

    var taxaMensal = 0.85;

    console.log('periodoSaldoProjetadoPorMes-->' + periodoSaldoProjetadoPorMes);
    console.log('periodoSaldoSimuladoPorMes-->' + periodoSaldoSimuladoPorMes);
    console.log('montanteProjetado-->' + montanteProjetado);
    console.log('montanteSimulado-->' + montanteSimulado);
    console.log('contribuicaoMensalAtual-->' + contribuicaoMensalAtual);

    var listaValoresProj = [];
    listaValoresProj.push(new item(-65536,-16777216,0,0));
    
    for(i = 1; i <= periodoSaldoProjetadoPorMes; i++){
        var anual = montanteProjetado;
        for(c = 1; c<=12 ; c++){
            anual = (anual *  (1+ (taxaMensal/100)))+ contribuicaoMensalAtual;
        }
        listaValoresProj.push(new item(-65536,-16777216,i,anual));
        montanteProjetado += anual;
    }
    var conjuntoProjetado = new conjuntoDado('Desc Proj',listaValoresProj);

    var listaValoresSim = [];
    listaValoresSim.push(new item(-16776961,-16777216,0,0));
    for(i = 1; i <= periodoSaldoSimuladoPorMes; i++){
        var anual = montanteSimulado;
        for(c = 1; c<=12 ; c++){
            anual = (anual *  (1+ (taxaMensal/100)))+ contribuicaoMensalSimulado;
        }
        listaValoresSim.push(new item(-16776961,-16777216,i,anual));
        montanteSimulado += anual;
    }
    var conjuntoSimu = new conjuntoDado('Desc Sim',listaValoresSim);

    var retorno = new Object();
    retorno.conjutoDados = [conjuntoProjetado,conjuntoSimu];

    var linhaLimitesSaidaProj = new linhaLimite(anoSaidaAtual+'',listaValoresProj.length);
    var linhaLimitesSaidaSimulado = new linhaLimite(anoSaidaSimulado+'',listaValoresSim.length);
    
    if(listaValoresSim.length > listaValoresProj.length){
        retorno.linhasLimites = [linhaLimitesSaidaProj,linhaLimitesSaidaSimulado];
    }else {
        retorno.linhasLimites = [linhaLimitesSaidaProj];
    }
    
    return retorno;
}

exports.calcularParaLinha = function(montanteInicial,contribuicaoExtra,contribuicaoMensalAtual,contribuicaoMensalSimulado,anoCorrente,anoSaidaAtual,anoSaidaSimulado,callback){
    callback(calculoLinha(montanteInicial,contribuicaoExtra,contribuicaoMensalAtual,contribuicaoMensalSimulado,anoCorrente,anoSaidaAtual,anoSaidaSimulado));
};

exports.calcularParaBarra = function(montanteInicial,contribuicaoExtra,contribuicaoMensalAtual,contribuicaoMensalSimulado,anoCorrente,anoSaidaAtual,anoSaidaSimulado,callback){


    callback(calculoBarra(montanteInicial,contribuicaoExtra,contribuicaoMensalAtual,contribuicaoMensalSimulado,anoCorrente,anoSaidaAtual,anoSaidaSimulado));
};

exports.calcularParaPizza = function(callback){
    callback(calculoPizza());
};