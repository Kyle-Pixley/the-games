import React, { useState, useEffect } from 'react'
import PlayerNumberGuesser from './playerNumberGuesser';
import './gameTwo.css';

function gameTwo() {

const [ isPlaying, setIsPlaying ] = useState(false);
const [ isComputerNumberGame, setIsComputerNumberGame ] = useState(false);
const [ isPlayerNumberGame, setIsPlayerNumberGame ] = useState(false);
const [ computersNumber, setComputersNumber ] = useState('');
const [ playersNumberGuess, setPlayersNumberGuess ] = useState('');



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
      <h3>{playersNumberGuess + ' is more than 100. Guess a number lower than 101 and more than 0.'}</h3>
    )
  } else if(playersNumberGuess <= 0) {
    //todo needs fixing ^^^^
    return ( 
      <h3>{playersNumberGuess + ' is less than 1. Guess a number lower than 101 and more than 0.'}</h3>
    )
  } else if(playersNumberGuess > computersNumber){
    return (
      <h3>Lower</h3>
    )
  } else if(playersNumberGuess < computersNumber){
    return (
      <h3>Higher</h3>
    )
  } else if(playersNumberGuess === computersNumber){
    return (
      <>
        <h3>You Got it!!!</h3>
        <button onClick={playAgain}>Play Again?</button>
      </>
    )
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
}

  return (
    <div id='number-guesser-container'>
      <h1 id='number-guesser-title'>Number Guesser</h1>
      <div id='number-guesser-content'>

      <h4 id='computer-or-player'>
        { !isPlaying ?
        (
          "Would you like to guess a number I am thinking of or would you like me to guess your number?"
          )
          : null }
      </h4>

      {isPlaying ? (
        null
        ) : (
          <div id='button-container'>
        <button id='guess-computer-number-button'
        onClick={() => guessComputerNumber()}>
          Guess computer number
        </button>
        <button id='guess-player-number-button'
        onClick={() => guessPlayerNumber()}>
          Guess player number
        </button>
      </div>
        )
      }

      {isComputerNumberGame ? (
        <div>
          <h2>
            Ok I am thinking of a number between 1 and 100.  Let's see if you can guess what it is.
          </h2>
          
          <form onSubmit={handleFormSubmit}>

            <input id='guess-computer-number-input'
            type='number'
            name='playerGuess'>
            </input>

            <button type='submit' id='guess-computer-number-submit'>
              GUESS
            </button>
          </form>

          <div>
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
//TODO so I think I will do the player number game in another file below this one
export default gameTwo