let invalido = false;
let lista = [];
let primeiraCarta;
let primeiraCartaEstado = true;
let virando = false;

function jogar () {
    let input = document.querySelector("#input");
    let cartas = parseInt(input.value);
    let telaStart = document.querySelector(".start");
    let telaGame = document.querySelector(".game");

    if(cartas < 4 || cartas > 14 || (cartas % 2 !== 0)){
        if(!invalido) telaStart.innerHTML += "<h2>Quantidade inválida de cartas!</h2>";
        invalido = true;
        input.value = null;
    }else{
        telaStart.classList.add("none");
        telaGame.classList.remove("none");
        telaGame.classList.add("flex");
        distribuirCartas(cartas);
    }
}
function distribuirCartas(cartas){
    let areaGame = document.querySelector(".game");
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
        areaGame.innerHTML += `<div class='carta flex carta-${lista[i]}' data-identifier='card' onclick='clicouCarta(this)'>
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

    if(carta.classList.contains("acertou") || virando) return 0;
    
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
}