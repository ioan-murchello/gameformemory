let hasFlipped = false;
let boardLock = false;
let total_curency = 0;
let total_curency_two = 0;
let first_card, second_card;
let playground_wrapper = document.querySelectorAll('.playground_wrapper');
let playground = document.querySelectorAll('.playground');
let game = document.querySelector('.main_menu');
let game_wrapper = document.querySelector('.game_wrapper');
let small_menu = document.querySelector('.small_menu');
let restart = small_menu.querySelector('.restart');
let go_to_menu = small_menu.querySelector('.go_to_menu');

game_wrapper.append(game);

let players = document.querySelector('.players');
let sum_of_cards = document.querySelector('.game_cards');
let start_btn = document.querySelector('.btn');

let arr = ['airplane','airplane','baseball','baseball','education','education','fork','fork'];

// let havyStage = {
//     airplane : './icons/airplane.svg',
//     baseball : './icons/baseball.svg',
//     education : './icons/education.svg',
//     fork : './icons/fork.svg'
// }

let fattr = 0, secattr = 0;

 game.addEventListener('click', (event) => {
    let target = event.target;

    if(target.classList.contains('blocks_style')){
        fattr = target.getAttribute('data-player');
    }

    if(target.classList.contains('sum')){
        secattr = target.getAttribute('data-card');
    }
 })

 start_btn.addEventListener('click', function(){
    startuem();
    if(fattr == 1 && secattr== 8){
        game.classList.add('hide');
        game_wrapper.removeChild(game);
        setTimeout(function(){
            game_wrapper.append(playground_wrapper[0]);
            playground_wrapper[0].classList.remove('hide');
            playground_wrapper[0].classList.add('show');
            }, 800)
    }

    if(fattr == 1 && secattr == 16){
        game.classList.add('hide');
        game_wrapper.removeChild(game);

        playground_wrapper[1].querySelectorAll('.card_body').forEach(el => {
            el.classList.add('dwa');
        });

        setTimeout(function(){
            game_wrapper.append(playground_wrapper[1]);
            playground_wrapper[1].classList.remove('hide');
            playground_wrapper[1].classList.add('show');
            }, 800)    
    }
})

// --------------------------------------------------------------------

    function flipCard(e){

    if(boardLock) return;

    let target = e.target.parentElement;
        target.classList.add('flip')
 
    // false double click at one card
    if(target === first_card) return

    if(!hasFlipped){
        //first click
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
let isEqual;
function checkForMatch(){
    isEqual = first_card.getAttribute('data-card') === second_card.getAttribute('data-card');

    if(isEqual){
        total_curency++;
        total_curency_two++;
    }
    
    isEqual ? disableCards() : flippedCards();

    if(fattr == 1 && secattr == 8 && total_curency == 4){
        setTimeout(() => {
            game_wrapper.append(small_menu);
            small_menu.classList.add('show');
        }, 1000)
        
    }

    if(fattr == 1 && secattr == 16 && total_curency_two == 8){
        setTimeout(() => {
            game_wrapper.append(small_menu);
            small_menu.classList.add('show');
        }, 1000)
        
    }
        
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

function startuem(){
    let cards = document.querySelectorAll('.card_body');
    cards.forEach(card => {
        card.addEventListener('click', flipCard)
    
    let randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
    })
}

function removeFlipClass(){
    let all_cards = document.querySelectorAll('.card_body');
        all_cards.forEach(el => {
            el.classList.remove('flip');
            el.removeEventListener('click', flipCard);
        })
}

restart.addEventListener('click', () => {

    small_menu.classList.add('hide');
    
    removeFlipClass();
    
     
    hasFlipped = boardLock = false;
    first_card = second_card = null;
    total_curency = 0;
    
     
    startuem();

})