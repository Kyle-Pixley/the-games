import React from 'react';
import '../gameOver/gameOver.css'

function GameOver({ playerBust , playersHand, dealersHand, playerScore, dealersScore }) {

    const displayWhyGameOver = () => {
        if(playerBust) {
            return (
                <div id='player-bust-game-over-hand'>
                    <h1>You lost all your money! better luck next time.</h1>
                </div>
            )
        }
    }
  return (
    <div id='game-over-container'>
        {displayWhyGameOver()}
    </div>
  )
}

export default GameOver