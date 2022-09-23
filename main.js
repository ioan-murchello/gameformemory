
let hasFlipped = false;
let boardLock = false;
let first_card, second_card;
let playground = document.querySelector('.playground');


let havyStage = {
    airplane : './icons/airplane.svg',
    baseball : './icons/basebal.svg',
    education : './icons/education.svg',
    fork : './icons/fork.svg'
}

let k = Object.keys(havyStage);

function makebody(attr){
    return `
    <div class="card_body" data-card=${attr}></div>`   
}

function makebackImg(src){
    return `
    <img class="back_card" alt=${src} src=${src}></img>`   
}

function makefrontImg(src){
    return `
    <img class="front_card" alt=${src} src=${src}></img>`   
}

function makeCards(num, obj){
    let card_body,back_card,front_card;

    for(let i = 0; i < num; i++){
        card_body = makebody('hello');
        
        for(let k in obj){
            back_card = makebackImg(obj[k]);
            card_body.append(back_card);
        }
        playground.innerHTML += card_body;
    }
}

makeCards(8, havyStage);

let flipCard = (e) => {
    if(boardLock) return;

    let target = e.target.parentElement;
        target.classList.add('flip')
    // false double click at one card
    if(target === first_card) return

    if(!hasFlipped){
        //firs click
        hasFlipped = true;
        first_card = target;
    }
    else{
        //second cclick
        hasFlipped = false;
        second_card = target;

        //checkForMath two cards
        checkForMatch()
    }
}

function checkForMatch(){
    let isEqual = first_card.getAttribute('data-card') === second_card.getAttribute('data-card');
    
    isEqual ? disableCards() : flippedCards();
        
}

function disableCards(){
        first_card.removeEventListener('click', flipCard);
        second_card.removeEventListener('click', flipCard);
}

function flippedCards(){
    boardLock = true;
    setTimeout(() => {
        first_card.classList.remove('flip');
        second_card.classList.remove('flip');
    resetBoard()

    }, 1500)
}

function resetBoard(){
    //to havy
    // [hasFlipped, boardLock] = [false, false];
    // [first_card, second_card] = [null, null];
    // присвоіли фолс boardLock і скопіювали значення в hasFlipped;
    //better
    hasFlipped = boardLock = false;
    first_card = second_card = null;
}

let cards = document.querySelectorAll('.card_body');
    cards.forEach(card => {
        card.addEventListener('click', flipCard)
    
    let randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
    })