let numeroMaximo = 1000;
let listaDeNumerosSorteados = []
let numeroSecreto = gerarNumeroAleatorio();
console.log(listaDeNumerosSorteados);
let tentativas = 1;

function textoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ("speechSynthesis" in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = "pt-BR";
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function menasgemInicial() {
    textoNaTela("h1", "Jogo do Numero secreto");
    textoNaTela("p", "Escolha um número entre 1 e "+ numeroMaximo +"!");
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    console.log(listaDeNumerosSorteados);
    limparCampo();
    tentativas = 1;
    menasgemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

function verificarChute() {
    let chute =document.querySelector("input").value;

    if (chute == numeroSecreto) {
        textoNaTela("h1", "Parabens");
        let palavraTentativa = tentativas > 1 ? "tentativas": "tentativa"; 
        let mensagemTentativas = "Você descobriu o número secreto com " +tentativas+ " " +palavraTentativa+ "!";
        textoNaTela("p", mensagemTentativas );
        document.getElementById("reiniciar").removeAttribute("disabled")
    } else {
        if (chute > numeroSecreto) { 
            textoNaTela("p", "É um número menor!");
        } else {
            textoNaTela("p", "É um número maior!");
        }
        tentativas ++;
        limparCampo()
    }
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
   let quantidadeElementosNaLista = listaDeNumerosSorteados.length;

   if (quantidadeElementosNaLista == numeroMaximo) {
    listaDeNumerosSorteados = []
   }

   if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

menasgemInicial()