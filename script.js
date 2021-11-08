const cards  = document.querySelectorAll(".memory-card");

let hasFlippedcard = false;
let firstCard , secondCard;
let lockBoard = false;


function flipCard() {

    if(lockBoard) return;
    if( this === firstCard) return;

    this.classList.add('flip')

    if (! hasFlippedcard) {
        // first click
        hasFlippedcard  = true;
        firstCard = this;
    }else{
        secondCard = this;
        // do cards match
        checkforMatch();
    }
} 

function checkforMatch() {
    let isMatched = (firstCard.querySelector(".front-face").alt === secondCard.querySelector(".front-face").alt)
    isMatched ? disableCards():unflippedCard();
}



function unflippedCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}
function disableCards() {
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    resetBoard();
}

function resetBoard() {
    [hasFlippedcard,lockBoard] = [false,false];
    [firstCard,secondCard] = [null , null];
}

// we used paranthesis covering the functiuon and after the function so that it is invoked automatically 
// as the game is initiliased/ code is compiled. 
//  this is like executing the function when document is ready with .ready function.

(function shuffle() {
    cards.forEach( card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order  = randomPos;
    });
})();



cards.forEach(card => card.addEventListener('click',flipCard));

