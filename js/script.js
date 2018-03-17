window.onload = function() {
    document.getElementById('intro-btn-hide').addEventListener('click', function() {
        const intro = document.querySelector('.intro').style;
        const game = document.querySelector('.game');

        intro.opacity = 1;

        (function fadeOut() {
            (intro.opacity -= .1) < 0 ? intro.display = "none" : setTimeout(fadeOut, 20)
        })();

        (function fadeIn() {
            setTimeout(function() {
                game.style.display = "block";
            }, 200);
        })();
    });
};


let scores, activePlayer, gamePlaying, randomPoint, randomDice;

init();

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

};

//3. Get player's dices
function getPlayersDice() {
    let dices = [];
    for (let i = 0; i < 3; i++) {
        dices.push(randomDice());
    };
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
        let checkDice = diceDOM.filter(function(elem) {
            if (elem == randomPoint) {
                return true;
            };
        });

        //6. Check the coincidence of numbers with each other ("Little Buck")
        let littleBuck = 0;
        for (var i = 0; i < diceDOM.length; i++) {
            for (var j = 0; j < diceDOM.length; j++) {
                if (diceDOM[i] === diceDOM[j] && j != i) {
                    littleBuck++;
                };
            };
        };

        //7. Сalculate and display points 
        if (checkDice.length == 1) {
            scores[activePlayer]++;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        } else if (checkDice.length == 2) {
            scores[activePlayer] = scores[activePlayer] + 2;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        } else if (checkDice.length == 3) { //("Big Buck")
            scores[activePlayer] = scores[activePlayer] + 15;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        } else if (littleBuck === 6) { //("Little Buck")
            scores[activePlayer] = scores[activePlayer] + 5;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        } else {
            //Next player
            nextPlayer();
        };
        //8. Determine the winner
        if (scores[activePlayer] >= 15) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        };
    };
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};