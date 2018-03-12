let scores, activePlayer, gamePlaying;


init();

// 1. Get a random number from 1 to 6
let randomDice = () => Math.floor(Math.random() * 6) + 1;

//2. Display an point (ace)
let randomPoint = randomDice();
//console.log(randomPoint);
let dicePoint = document.getElementById('dice-point');
dicePoint.src = 'img/dice-' + randomPoint + '.png';

//3. Get player's dices
function getPlayersDice() {
    let dices = [];
    for (let i = 0; i < 3; i++) {
        dices.push(randomDice());

    };
    return dices;
};

document.querySelector('.btn-roll').addEventListener('click', function() {
    //4. Display player's dices
    let diceDOM = getPlayersDice();
    //console.log(diceDOM);
    for (let i = 0; i < 3; i++) {
        document.getElementById('dice-' + i).src = 'img/dice-' + diceDOM[i] + '.png';
    };

    //5. Check the coincidence of numbers
    //    for (let i = 0; i < 3; i++) {
    //        if (randomPoint == diceDOM[i]) {
    //            scores[activePlayer]++;
    //            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //
    //        }else {
    //            //Next player
    //           // nextPlayer();
    //            console.log('her');
    //        }
    //    }

    let strDice = '';

    for (let i in diceDOM) {
        /* если есть совпадения, то помещаем 
         * индекс (i) элемента в результирующую строку */
        if (diceDOM[i] == randomPoint) {
            scores[activePlayer]++;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        }else {
                //Next player
                nextPlayer();
                //console.log('her');
            }
    }
    

});





function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //    document.querySelector('.dice-section-0').style.display = 'none';
    //    document.querySelector('.dice-section-1').style.display = 'none';
}



document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}