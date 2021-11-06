let invalid = false;
let firstCardState = true;
let fliping = false;
let cardlList = [];
let firstCard;
let round;
let second;
let countSecondsId;

let startScreen = document.querySelector(".start");
let gameScreen = document.querySelector(".game");
let winScreen = document.querySelector(".win");
let gameDetails = document.querySelector(".game-details");
let rounds = document.querySelector(".moves").children[1];
let seconds = document.querySelector(".time").children[1];


function play () {
    let input = document.querySelector("#input");
    let cards = parseInt(input.value);

    round = 0;
    rounds.innerHTML = round;
    second = 0;
    seconds.innerHTML = second;

    if(cards < 4 || cards > 14 || (cards % 2 !== 0)){
        if(!invalid) startScreen.innerHTML += "<h2>Quantidade inválida de cartas!</h2>";
        invalid = true;
        input.value = null;
    }else{
        startScreen.classList.add("none");
        gameScreen.classList.remove("none");
        gameScreen.classList.add("flex");
        gameDetails.classList.remove("none");
        gameDetails.classList.add("flex", "evenly");
        distributeCards(cards);
    }
}
function distributeCards(cards){
    countSecondsId = setInterval(countSeconds, 1000);
    let counter = 0;

    do{
        let random = parseInt(Math.random () * (cards / 2));
        for(let i = 0; i < cardlList.length; i ++){
          if(random === cardlList[i]) counter++;
        }
        if(counter < 2) cardlList.push(random);
        counter = 0;
    }while(cardlList.length < cards);

    alert(cardlList);

    for(let i = 0; i < cards; i ++){
        gameScreen.innerHTML += `
            <div class='card flex card-${cardlList[i]}' data-identifier='card' onclick='clickCard(this)'>
                <div class='front-face face flex' data-identifier='front-face'>
                    <img src='assets/media/front.png' alt='parrot-image'/>
                </div>
                <div class='back-face face flex flipped' data-identifier='back-face'>
                    <img src='assets/media/${cardlList[i]}.gif' alt='parrot-gif'/>
                </div>
            </div>
        `
    }
}

function clickCard(card){
    let frontFace = card.querySelector(".front-face");
    let backFace = card.querySelector(".back-face");
    let currentClass = card.classList[2];
    let flippedCard = card.children[0].classList.contains("flipped")

    if(flippedCard || fliping) return;

    round++;
    rounds.innerHTML = round;
    
    frontFace.classList.toggle("flipped");
    backFace.classList.toggle("flipped");
    
    if(firstCardState) {
        firstCard = card;
        firstCardState = false;
    }else{
        let lastClass = firstCard.classList[2];
        if(currentClass == lastClass){
            card.classList.add("right");
            firstCard.classList.add("right");
        }else{
            let lastFrontFace = firstCard.querySelector(".front-face");
            let lastBackFace = firstCard.querySelector(".back-face");
            fliping = true; 
            setTimeout(function(){ 
                frontFace.classList.toggle("flipped");
                backFace.classList.toggle("flipped");
                lastFrontFace.classList.toggle("flipped");
                lastBackFace.classList.toggle("flipped");
                fliping = false;
            }, 1000);
        }
        firstCardState = true;
    }
    
    let rightCards = document.querySelectorAll(".right");
    
    if(rightCards.length === cardlList.length) setTimeout(win, 1000);
}
function win(){
    clearInterval(countSecondsId);
    gameScreen.classList.remove("flex");
    gameScreen.classList.add("none");
    gameDetails.classList.add("none");
    gameDetails.classList.remove("flex", "evenly");
    winScreen.classList.remove("none")
    winScreen.classList.add("opacity", "flex", "column")
    

    winScreen.innerHTML = `
        <h2>Parabéns,<br>Você ganhou em ${round} rodadas<br> e demorou ${second} segundos!</h2>
        <div class="restart dark-green">
            <h3>Quer jogar de novo?</h3>
            <button class="green" onclick="playAgain()">Sim</button>
            <button class="green" onclick="end(this)">Não</button>
        </div>
    `
}
function playAgain(){
    gameScreen.innerHTML = ""
    cardlList = [];

    winScreen.classList.remove("opacity", "flex", "column")
    winScreen.classList.add("none")
    startScreen.classList.remove("none")
}
function end(button){
    button.parentNode.remove();

    winScreen.innerHTML += "<h2>Obrigado por jogar :)</h2>"
}

function countSeconds() {
    seconds.innerHTML = second;
    second++;
}