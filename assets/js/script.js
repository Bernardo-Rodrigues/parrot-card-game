let invalido = false;
let primeiraCartaEstado = true;
let virando = false;
let lista = [];
let primeiraCarta;
let rodadas;
let segundo = 0;
let somarSegundoId;

let telaStart = document.querySelector(".start");
let telaGame = document.querySelector(".game");
let telaWin = document.querySelector(".win");
let gameDetails = document.querySelector(".game-details");
let jogadas = document.querySelector(".moves").children[1];
let segundos = document.querySelector(".time").children[1];


function jogar () {
    let input = document.querySelector("#input");
    let cartas = parseInt(input.value);
    rodadas = 0;

    if(cartas < 4 || cartas > 14 || (cartas % 2 !== 0)){
        if(!invalido) telaStart.innerHTML += "<h2>Quantidade inválida de cartas!</h2>";
        invalido = true;
        input.value = null;
    }else{
        telaStart.classList.add("none");
        telaGame.classList.remove("none");
        telaGame.classList.add("flex");
        gameDetails.classList.remove("none");
        gameDetails.classList.add("flex", "evenly");
        distribuirCartas(cartas);
    }
}
function distribuirCartas(cartas){
    somarSegundoId = setInterval(somarSegundo, 1000);
    let cont = 0;

    do{
        let random = parseInt(Math.random () * (cartas / 2));
        for(let i = 0; i < lista.length; i ++){
          if(random === lista[i]) cont++;
        }
        if(cont < 2) lista.push(random);
        cont = 0;
    }while(lista.length < cartas);

    alert(lista);

    for(let i = 0; i < cartas; i ++){
        telaGame.innerHTML += `<div class='carta flex carta-${lista[i]}' data-identifier='card' onclick='clicouCarta(this)'>
                                    <div class='front-face face flex' data-identifier='front-face'>
                                        <img src='assets/media/front.png'/>
                                    </div>
                                    <div class='back-face face flex virar' data-identifier='back-face'>
                                        <img src='assets/media/${lista[i]}.gif'/>
                                    </div>
                                </div>`
    }
}

function clicouCarta(carta){
    let frontFace = carta.querySelector(".front-face");
    let backFace = carta.querySelector(".back-face");
    let classeAtual = carta.classList[2];
    let cartaVirada = carta.children[0].classList.contains("virar")

    if(cartaVirada || virando) return;

    rodadas++;
    jogadas.innerHTML = rodadas;
    
    frontFace.classList.toggle("virar");
    backFace.classList.toggle("virar");
    
    if(primeiraCartaEstado) {
        primeiraCarta = carta;
        primeiraCartaEstado = false;
    }else{
        let classeUltima = primeiraCarta.classList[2];
        if(classeAtual == classeUltima){
            carta.classList.add("acertou");
            primeiraCarta.classList.add("acertou");
        }else{
            let frontFaceUltima = primeiraCarta.querySelector(".front-face");
            let backFaceUltima = primeiraCarta.querySelector(".back-face");
            virando = true; 
            setTimeout(function(){ 
                frontFace.classList.toggle("virar");
                backFace.classList.toggle("virar");
                frontFaceUltima.classList.toggle("virar");
                backFaceUltima.classList.toggle("virar");
                virando = false;
            }, 1000);
        }
        primeiraCartaEstado = true;
    }
    
    let cartasCertas = document.querySelectorAll(".acertou");
    
    if(cartasCertas.length === lista.length) setTimeout(win, 1000);
}
function win(){
    clearInterval(somarSegundoId);
    telaGame.classList.remove("flex");
    telaGame.classList.add("none");
    gameDetails.classList.add("none");
    gameDetails.classList.remove("flex", "evenly");
    telaWin.classList.remove("none")
    telaWin.classList.add("opacity", "flex", "column")
    

    telaWin.innerHTML = `
    <h2>Parabéns,<br>Você ganhou em ${rodadas} rodadas<br> e demorou ${segundo} segundos!</h2>
    <div class="reiniciar verde-escuro">
        <h3>Quer jogar de novo?</h3>
        <button class="verde" onclick="jogarDeNovo()">Sim</button>
        <button class="verde" onclick="fim(this)">Não</button>
    </div>
    `
}
function jogarDeNovo(){
    telaGame.innerHTML = ""
    lista = [];

    telaWin.classList.remove("opacity", "flex", "column")
    telaWin.classList.add("none")
    telaStart.classList.remove("none")
}
function fim(botao){
    botao.parentNode.remove();

    telaWin.innerHTML += "<h2>Obrigado por jogar :)</h2>"
}

function somarSegundo() {
    segundos.innerHTML = segundo;
    segundo++;
}