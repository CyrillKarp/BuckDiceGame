let scores, activePlayer, gamePlaying, randomPoint, randomDice;

init();

//3. Get player's dices
function getPlayersDice() {
    let dices = [];
    for (let i = 0; i < 3; i++) {
        dices.push(randomDice());
    }
    return dices;
};

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //4. Display player's dices
        let diceDOM = getPlayersDice();
        //console.log(diceDOM);diceDOM.style.display = 'block';
        document.querySelector('.dice-img').style.display = 'block';
        for (let i = 0; i < 3; i++) {
            document.getElementById('dice-' + i).src = 'img/dice-' + diceDOM[i] + '.png';
        };

        //5. Check the coincidence of numbers
        function isRandomPoint(number) {
            return number === randomPoint;
        };

        if (diceDOM.some(isRandomPoint)) {
            scores[activePlayer]++;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            if (scores[activePlayer] >= 15) {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
            }

        } else {
            //Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    // 1. Get a random number from 1 to 6
    randomDice = () => Math.floor(Math.random() * 6) + 1;

    //2. Display an point (ace)
    randomPoint = randomDice();
    //console.log(randomPoint);
    let dicePoint = document.getElementById('dice-point');
    dicePoint.src = 'img/dice-' + randomPoint + '.png';

    scores = [0, 0];
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice-img').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}