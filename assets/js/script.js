let invalido = false;
let lista = [];

function jogar () {
    let cartas = parseInt(document.querySelector("#input").value);
    let telaStart = document.querySelector(".start");
    let telaGame = document.querySelector(".game");

    if(cartas < 4 || cartas > 14 || (cartas % 2 !== 0)){
        if(!invalido) telaStart.innerHTML += "<h2>Quantidade inválida de cartas!</h2>";
        invalido = true;
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
        areaGame.innerHTML += "<div class='carta'></div>"
    }
}