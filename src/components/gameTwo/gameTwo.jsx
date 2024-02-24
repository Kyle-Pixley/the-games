import React, { useState, useEffect } from 'react'
import PlayerNumberGuesser from './playerNumberGuesser';
import './gameTwo.css';

function gameTwo() {

const [ isPlaying, setIsPlaying ] = useState(false);
const [ isComputerNumberGame, setIsComputerNumberGame ] = useState(false);
const [ isPlayerNumberGame, setIsPlayerNumberGame ] = useState(false);
const [ computersNumber, setComputersNumber ] = useState('');
const [ playersNumberGuess, setPlayersNumberGuess ] = useState('');
const [ isWin, setIsWin ] = useState(false);
const [ inputGrowSize, setInputGrowSize ] = useState('');

const inputStyle = {
  width: `${inputGrowSize.length * 22}px`,
};
const handleGrow = (e) => {
  setInputGrowSize(e.target.value)
};


const guessComputerNumber = () => {
  setIsPlaying(true);

  setIsComputerNumberGame(true);

  const newComputerNumber = (Math.floor(Math.random()*101));
  setComputersNumber(newComputerNumber);
};


const guessPlayerNumber = () => {
  setIsPlaying(true);
  setIsPlayerNumberGame(true);
}

const handleFormSubmit = e => {
  e.preventDefault();
  setPlayersNumberGuess(Number(e.target.playerGuess.value))
}

const highOrLow = () => {

  if(playersNumberGuess === ''){
    return null
  } else if(playersNumberGuess > 100){
    return (
      <h3 id='guess-response'>{playersNumberGuess + ' is more than 100. Guess a number lower than 101 and more than 0.'}</h3>
    )
  } else if(playersNumberGuess <= 0) {
    return ( 
      <h3 id='guess-response'>{playersNumberGuess + ' is less than 1. Guess a number lower than 101 and more than 0.'}</h3>
    )
  } else if(playersNumberGuess > computersNumber){
    return (
      <h3 id='guess-response'>My number is lower than {playersNumberGuess}.</h3>
    )
  } else if(playersNumberGuess < computersNumber){
    return (
      <h3 id='guess-response'>My number is higher than {playersNumberGuess}</h3>
    )
  } else if(playersNumberGuess === computersNumber){
    setIsWin(true);
  } else {
    return (
      <h3>I am sorry what? Make sure you are entering a whole number.</h3>
    )
  }
};

const playAgain = () => {
  setIsPlaying(false);
  setIsComputerNumberGame(false);
  setComputersNumber('');
  setPlayersNumberGuess('');
  setIsWin(false);
}

  return (
    <div id='number-guesser-container'>
      <h1 id='number-guesser-title'>Number Guesser</h1>
      <div id='number-guesser-content'>

        <h4 id='computer-or-player'>
        { !isPlaying ?
        (
          <div id='game-choose-container'>
            <p id='computer-or-player-text'>
            Would you like to guess a number I am thinking of or would you like me to guess your number?
            </p>
            <div id='button-container'>
            <button id='guess-computer-number-button'
            className='guess-number-buttons'
            onClick={() => guessComputerNumber()}>
              Guess computer number
            </button>
            <button id='guess-player-number-button'
            className='guess-number-buttons'
            onClick={() => guessPlayerNumber()}>
              Guess player number
            </button>
            </div>
          </div>
          )
          : null }
      </h4>

      {isComputerNumberGame ? (
        <div id='computer-number-game-container'>
          {isWin ? (
            <div id='win-container'>
            <h3 id='win-title'>You Got it!!!</h3>
            <p id='win-computers-number'>My number was {computersNumber}.</p>
            <button id='play-again-button' 
              onClick={playAgain}>
              Play Again?
            </button>
          </div>
          ) :
            (
              <>
              {playersNumberGuess ? highOrLow() :
                <h2 id='computer-number-intro-text'>
                  Ok I am thinking of a number between 1 and 100.  Let's see if you can guess what it is.
                </h2>
                }

                  <form id='guess-computer-number-form' onSubmit={handleFormSubmit}>

                    <input
                      id='guess-computer-number-input'
                      style={inputStyle}
                      onChange={handleGrow}
                      type='number'
                      name='playerGuess'>
                    </input>
              
                    <button type='submit'
                      id='guess-computer-number-submit'>
                      SUBMIT GUESS
                    </button>
                  </form>
              </>
              )}

          <div id='high-or-low-response-container'>
            {/* {computersNumber ? highOrLow() : null} */}
          </div>
        </div>
      ) : (
        null
        )}
      {isPlayerNumberGame ? 
      <PlayerNumberGuesser isPlaying={isPlaying} setIsPlaying={setIsPlaying} isPlayerNumberGame={isPlayerNumberGame} setIsPlayerNumberGame={setIsPlayerNumberGame} 
      /> : null }
        </div>
    </div>
  )
}

export default gameTwo