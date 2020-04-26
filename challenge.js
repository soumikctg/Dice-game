var scores, roundScore, activePlayer, gamePlaying, doubleSix, dice, dice2;

//Initial function
function init(){
    scores= [0,0];
    roundScore = 0;
    activePlayer= 0;
    gamePlaying = true;
    doubleSix = false;
    

    document.querySelector('.dice').style.display= 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

// Change active player function
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none';
}


//global score reset function
function scoreReset(){
    scores[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = '0';
}

//initial function call
init();

//Roll dice button DOM
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1.random number
        dice = Math.floor(Math.random()*6)+1;
        
        //console.log('2nd ' + dice2);
        if (dice === 6 && dice2 === 6){
            doubleSix = true;
        }
        //console.log(' 1st ' + dice);

        //2.display result
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        //3.update the current number if the dice is not 1.if it is 1 then change the player
        if(dice !== 1){
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore; 
        }
        else{
            //change player function call
            nextPlayer();
        }
        dice2 = dice;
        if(doubleSix){
            dice2=0;
            scoreReset();
            nextPlayer();
            doubleSix= false;
        }
        
    }
});


// Hold button DOM

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //1. Add roundscore to Global score
        scores[activePlayer] += roundScore;

        //2.Display global score
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];


        //3. check if the player has won or else change active player
        if(scores[activePlayer] >= 100){
            //console.log('player' + activePlayer);
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else{
            nextPlayer();
        }
        dice2=0;
    }

});


//New Game button Dom

document.querySelector('.btn-new').addEventListener('click', init);
