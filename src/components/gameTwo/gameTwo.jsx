import React, { useState, useEffect } from 'react'
import PlayerNumberGuesser from './playerNumberGuesser';
import './gameTwo.css';

function gameTwo() {

const [ isPlaying, setIsPlaying ] = useState(false);
const [ isComputerNumberGame, setIsComputerNumberGame ] = useState(false);
const [ isPlayerNumberGame, setIsPlayerNumberGame ] = useState(false);
const [ computersNumber, setComputersNumber ] = useState('');
const [ playersNumberGuess, setPlayersNumberGuess ] = useState('');
const [ inputGrowSize, setInputGrowSize ] = useState('');
const [ isWin, setIsWin ] = useState(false);

const inputStyle = {
  width: `${inputGrowSize.length * 22}px`,
};
const handleGrow = (e) => {
  setInputGrowSize(e.target.value)
};


const guessComputerNumber = () => {
  setIsPlaying(true);
  console.log('guess computer number function activated')

  setIsComputerNumberGame(true);

  const newComputerNumber = (Math.floor(Math.random()*101));
  setComputersNumber(newComputerNumber);
};

useEffect(() => {
  if(playersNumberGuess !== ''){
    console.log(playersNumberGuess)
    
  } else null
}, [playersNumberGuess])

const guessPlayerNumber = () => {
  setIsPlaying(true);
  setIsPlayerNumberGame(true);
}

const handleFormSubmit = e => {
  e.preventDefault();
  console.log("Form submit button hit");
  setPlayersNumberGuess(Number(e.target.playerGuess.value))
}

const highOrLow = () => {
  //! don't forget to take this out
  console.log(computersNumber)
  //!==============================

  if(playersNumberGuess === ''){
    console.log('this')
    return null
  } else if(playersNumberGuess > 100){
    return (
      <h3 id='guess-response'>{playersNumberGuess + ' is more than 100. Guess a number lower than 101 and more than 0.'}</h3>
    )
  } else if(playersNumberGuess <= 0) {
    //todo needs fixing ^^^^
    return ( 
      <h3 id='guess-response'>{playersNumberGuess + ' is less than 1. Guess a number lower than 101 and more than 0.'}</h3>
    )
  } else if(playersNumberGuess > computersNumber){
    return (
      <h3 id='guess-response'>Lower</h3>
    )
  } else if(playersNumberGuess < computersNumber){
    return (
      <h3 id='guess-response'>Higher</h3>
    )
  } else if(playersNumberGuess === computersNumber){
    return (
      <div id='win-container'>
        <h3 id='win-title'>You Got it!!!</h3>
        <button id='play-again-button' 
          onClick={playAgain}>
          Play Again?
        </button>
      </div>
    )
  } else {
    return (
      <h3>I am sorry what? Make sure you are entering a whole number.</h3>
    )
  }
};

useEffect(() => {
  console.log(`is win is ${isWin}`)
  if (playersNumberGuess === computersNumber && playersNumberGuess !== '') {
    setIsWin(true);
  }
  
}, [playersNumberGuess, computersNumber]);

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
          {isWin ? null :
            (
              <>
                <h2 id='computer-number-intro-text'>
                  Ok I am thinking of a number between 1 and 100.  Let's see if you can guess what it is.
                </h2>

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
            {computersNumber ? highOrLow() : null}
          </div>
        </div>
      ) : (
        null
        )}
      {isPlayerNumberGame ? <PlayerNumberGuesser isPlaying={isPlaying} /> : null }
        </div>
    </div>
  )
}

export default gameTwo