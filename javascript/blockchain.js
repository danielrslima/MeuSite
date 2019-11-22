var enderecoContrato = "0xf21c2b51bA4ec1bEcB34434279c37EB49Bc74eE7";
var provedor = new ethers.providers.Web3Provider(web3.currentProvider);
ethereum.enable();
var signatario = provedor.getSigner(); // serve para buscar a asssinatura, a partir de uma chave privada
var contrato = new ethers.Contract(enderecoContrato, abiContrato, signatario);

function registrarMudancaStatus() {
    var textoCampo = document.frmStatus.txtStatusPagamentoAluguel.value;
    var caixaStatusTx = document.getElementById("caixaStatusTx");
    if (textoCampo.length === 8) {
        caixaStatusTx.innerHTML = "Enviando transação...";
        contrato.mudaStatusPagamento(textoCampo)
        .then( (transacao) => {
            console.log("registrarMudancaStatus - Transacao ", transacao);   
            caixaStatusTx.innerHTML = "Transação enviada. Aguardando processamento...";
            transacao.wait()
            .then( (resultado) => {
                buscaStatusContrato();
                caixaStatusTx.innerHTML = "Transação realizada.";
            })        
            .catch( (err) => {
                console.error("registrarMudancaStatus - Aguardando tx ser minerada");
                console.error(err);
                caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
            })
        })
        .catch( (err) => {
            console.error("registrarMudancaStatus");
            console.error(err);
            caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
        })
    }
}

function buscaStatusContrato() {
    var status;
    var campoStatus = document.getElementById("campoStatus");     
    contrato.statusPagamentoAluguel()
    .then( (resultado) => {
        campoStatus.innerHTML = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoStatus.innerHTML = err;
    });
}