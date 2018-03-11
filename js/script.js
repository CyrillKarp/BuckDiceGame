let scores, activePlayer, playerNumber, gamePlaying;


init();

// 1. Get a random number from 1 to 6
let randomDice = () => Math.floor(Math.random() * 6) + 1;

//2. Display an point (ace)
let randomPoint = randomDice();
console.log(randomPoint);
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
    function displayPlayersDice() {
        playerNumber[activePlayer] = getPlayersDice();
        console.log(playerNumber[activePlayer]);
        for (let i = 0; i < 3; i++) {
            document.getElementById('player-' + activePlayer + '-dice-' + i).src = 'img/dice-' + playerNumber[activePlayer][i] + '.png';
        };
    };
    displayPlayersDice();
    
    
    
    for (let i = 0; i < 3; i++) {
        if (randomPoint = playerNumber[activePlayer][i]) {
            console.log('the numbers are the same');
        }else {
            //Next player
            nextPlayer();
        }
    };

    
});





function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none';
}



document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    playerNumber = [0, 1];
    gamePlaying = true;
    
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}