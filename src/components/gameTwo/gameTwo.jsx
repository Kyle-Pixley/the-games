import React, { useState, useEffect } from 'react'
import './gameTwo.css'

function gameTwo() {

const [ isPlaying, setIsPlaying ] = useState(false);
const [ isComputerNumberGame, setIsGuessComputerNumberGame ] = useState(false);
const [ isPlayerNumberGame, setIsPlayerNumberGame ] = useState(false);
const [ computersNumber, setComputersNumber ] = useState('');
const [ playersNumberGuess, setPlayersNumberGuess ] = useState('');



const guessComputerNumber = () => {
  setIsPlaying(true);
  console.log('guess computer number function activated')

  setIsGuessComputerNumberGame(true);

  const newComputerNumber = (Math.floor(Math.random()*101));
  setComputersNumber(newComputerNumber);
};

useEffect(() => {
  console.log(computersNumber)
}, [computersNumber])

useEffect(() => {
  if(playersNumberGuess !== ''){
    console.log(playersNumberGuess)
    
  } else null
}, [playersNumberGuess])

const guessPlayerNumber = () => {
  setIsPlaying(true)
}

const handleFormSubmit = e => {
  e.preventDefault();
  console.log("Form submit button hit");
  setPlayersNumberGuess(Number(e.target.playerGuess.value))
  // isComputerNumberGame ? userGuessComputerNumber() : computerGuessUserNumber();
}

const highOrLow = () => {
  console.log(typeof(playersNumberGuess),'this is  players number')
  console.log(typeof(computersNumber), 'this is computer')


  if(playersNumberGuess == ''){
    return null
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
      <h3>I am sorry what?</h3>
    )
  }
};

const playAgain = () => {
  console.log("This will reset all the useStates to start the game again from choosing to play computer or computer playing you")
}

const computerGuessUserNumber = () => {
  console.log('This is for the computer to guess the users number logic')
}

  return (
    <div id='number-guesser-container'>
      <h1 id='number-guesser-title'>Number Guesser</h1>
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
    </div>
  )
}

export default gameTwo