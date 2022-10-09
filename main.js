
let hasFlipped = false;
let boardLock = false;
let first_card, second_card;
let playground = document.querySelectorAll('.playground');
let game = document.querySelector('.main_menu');
let game_wrapper = document.querySelector('.game_wrapper');

game_wrapper.append(game);

let players = document.querySelector('.players');
let sum_of_cards = document.querySelector('.game_cards');
let start_btn = document.querySelector('.btn');

let arr = ['airplane','airplane','baseball','baseball','education','education','fork','fork'];

let havyStage = {
    airplane : './icons/airplane.svg',
    baseball : './icons/baseball.svg',
    education : './icons/education.svg',
    fork : './icons/fork.svg'
}

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

 start_btn.addEventListener('click', function(event){

    if(fattr == 1 && secattr== 12){
        game.classList.add('hide');
        game_wrapper.remove(game);
        // playground[0].classList.remove('hide');
        setTimeout(function(){
            game_wrapper.append(playground[0]);
        playground[0].style.display = 'flex';
        playground[0].classList.remove('hide');
        },1000)
    }

    if(fattr == 1 && secattr == 16){
        game.classList.add('hide');
        game_wrapper.remove(game);
        playground[1].querySelectorAll('.card_body').forEach(el => {
            el.classList.add('dwa');
            setTimeout(function(){
                game_wrapper.append(playground[1]);
                playground[1].classList.remove('hide');
                playground[1].style.display = 'flex';
            }, 1000)
        });
        
        
        
    }
})

function makebody(){
        let card = document.createElement('div');
            card.classList.add('card_body');
      

        let bc = document.createElement('img');
            bc.classList.add('back_card');
            

        let fc = document.createElement('img');
            fc.classList.add('front_card');
           

        card.append(bc);
        card.append(fc);

    return card;
       
}  

function makeCards(num){
    let card_body;
    for(let i = 0; i < num; i++){
        card_body = makebody();
        playground.append(card_body);
    }
    makeAttr(havyStage, playground);
    makeImgSrc(playground)
}

function makeAttr(arrat, play){
   let k;
    let cards = play.querySelectorAll('.card_body');
            for(let j = 0; j < cards.length; j++){
                for(let key in arrat){
                    console.log(k)
                    k = key
                }
                cards[j].setAttribute('data-card', k) 
            }

   
        
}

function makeImgSrc(block){
    let images = [];
    let img = block.querySelectorAll('.back_card');
    let n = [...img];
    
        for(let i = 0; i < n.length; i++){
            
          for(let key in havyStage){
            images.push(havyStage[key])
            
          }
          n[i].src = images[i]
        }
}

// makeCards(8);

let flipCard = (e) => {
    if(boardLock) return;

    let target = e.target.parentElement;
    console.log(target)
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