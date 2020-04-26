/********
Game rules:

-the game has 2 players, playing in rounds
-in each turn, a player rolls a dice as many times as he wishes..each result get added to his Round score
-But, if the player rolls a 1, all his Round score gets lost.after that , it's the next player's turn
-The player can choose to 'HOLD', which means taht his round score gets added to his global score. after that it's the next player's turn
- the first player to reach 100 points on global score wins the game
 */


var scores, roundScores,activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3.Update the round score If the rolled number was NOT a 1
        if (dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{
            nextPlayer();
        }
    }
    

});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add current score to global score
        scores[activePlayer] += roundScore;
        

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        
        // check if player won the game 
        if(scores[activePlayer] >= 10){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else{
            //NEXT PLAYER
            nextPlayer();
        }
    }

});

/////////next player

function nextPlayer(){
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore= 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-0-panel').classList.remove('active');

    document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);


function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

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


//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;


/******
1. A player looses his entire score when he rolls two 6 in a row. After that, it's the next player's turn.(Hint: Always save the previous dice roll in a seperate variable)
2.Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.(Hint: you can read the value property in javascript.this is a good opportunity to use google to figure this out)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when ne of them is a 1.(Hint: you will need css to position the second dice, so take a loot at the css code for the first one.)

*/