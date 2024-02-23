import React, {useState, useEffect} from 'react'
import './playerNumberGuesser.css'

function playerNumberGuesser({ isPlayerNumberGame, setIsPlayerNumberGame, isPlaying, setIsPlaying }) {

    const [ beginningNumberRange, setBeginningNumberRange ] = useState('');
    const [ endNumberRange, setEndNumberRange ] = useState('');
    const [ computerGuessNumber, setComputerGuessNumber ] = useState('');
    const [ halfBetweenBeginAndEnd, setHalfBetweenBeginAndEnd ] = useState('');
    const [ numberOfGuesses, setNumberOfGuesses ] = useState(0);
    const [ isUserError, setIsUserError ] = useState(false);
    const [ isHigherOrLower, setIsHigherOrLower ] = useState(false);
    const [ isNumberCorrect, setIsNumberCorrect ] = useState(false);
    const [ iKnowYourNumber, setIKnowYourNumber ] = useState(false);
    const [ inputGrowSizeOne, setInputGrowSizeOne ] = useState('');
    const [ inputGrowSizeTwo, setInputGrowSizeTwo ] = useState('');
    const [ isComputerGuessing, setIsComputerGuessing ] = useState(false);
    const [ isComputerCorrect, setIsComputerCorrect ] = useState(false);
    
    const playAgain = () => {
        setBeginningNumberRange('');
        setEndNumberRange('');
        setHalfBetweenBeginAndEnd('');
        setNumberOfGuesses(0);
        setIsUserError(false);
        setIsHigherOrLower(false);
        setIsNumberCorrect(false);
        setIKnowYourNumber(false);
        setIsComputerGuessing(false);
        setIsPlayerNumberGame(false);
        setIsPlaying(false);
    }

    const getInputStyle = (inputGrowSize) => {
        return {
            width: `${inputGrowSize.length * 20}px`,
        };
    }
    
    const inputStyleOne = getInputStyle(inputGrowSizeOne);
    const inputStyleTwo = getInputStyle(inputGrowSizeTwo);
    

const handleGrowOne = (e) => {
    setInputGrowSizeOne(e.target.value)
};
const handleGrowTwo = (e) => {
    setInputGrowSizeTwo(e.target.value)
};

    const handleFormSubmitBeginningEnd = e => {
        e.preventDefault();
        console.log(';alksdjf;')
        setBeginningNumberRange(Number(e.target.beginningNumber.value));
        setEndNumberRange(Number(e.target.endNumber.value));
        setIsComputerGuessing(true);
    };
    
    const getComputersGuess = () => {
        setHalfBetweenBeginAndEnd(Math.floor(Number((beginningNumberRange + endNumberRange) / 2)))

        if(beginningNumberRange +2 === endNumberRange){
            setIKnowYourNumber(true);
        }
    };

    const numberIsHigher = () => {
        setBeginningNumberRange(halfBetweenBeginAndEnd);
        getComputersGuess();
        setNumberOfGuesses(numberOfGuesses + 1);
    };
    const numberIsLower = () => {
        setEndNumberRange(halfBetweenBeginAndEnd);
        getComputersGuess();
        setNumberOfGuesses(numberOfGuesses + 1);
    };
    const numberIsCorrect = () => {
        setIsNumberCorrect(true);
        return computerKnowsYourNumber();
    };

    const computerKnowsYourNumber = () => {
        console.log("computerKnowsYourNumber function hit")
        console.log(`${isUserError} is user error`)
        console.log(`${isNumberCorrect} isNumberCorrect`)
        console.log(`${iKnowYourNumber} iKnowYourNumber`)
        console.log(`${isHigherOrLower} isHigherOrLower`)
        return (
            <div id='computer-knows-your-number-container'>
                <h3>Your number is {halfBetweenBeginAndEnd}!</h3>
                <button id='play-again-button'onClick={() => playAgain()}>Play Again?</button>
            </div>
        )
    }

    const higherOrLower = () => {
        console.log('higher or lower is hit')
        return (
            <div id='high-low-correct-buttons-container'>

                <h3 id='is-your-number'>Is your number {halfBetweenBeginAndEnd}?</h3>

                <div id='high-low-button-container'>
                    <button className='high-low-buttons' onClick={numberIsHigher}>Higher</button>
                    <button className='high-low-buttons' onClick={numberIsLower}>Lower</button>
                </div>
                    <button id='correct-button' onClick={ () => setIsNumberCorrect(true)}>Correct</button>
            </div>
        )

    }

    useEffect(() => {
        if(halfBetweenBeginAndEnd !== ''){
            setIsHigherOrLower(true);
        }
    },[halfBetweenBeginAndEnd])

    const backToGuessPlayerNumber = () => {
        setBeginningNumberRange('');
        setEndNumberRange('');
        setHalfBetweenBeginAndEnd('');
        setNumberOfGuesses(0);
        setIsUserError(false);
        setIsHigherOrLower(false);
        setIsNumberCorrect(false);
        setIKnowYourNumber(false);
        setIsComputerGuessing(false);
    }
    
    const userError = () => {
        if(beginningNumberRange >= endNumberRange) {
            return (
                <div>
                    <h3>The end number needs to be greater than the beginning number.</h3>
                    <button onClick={() => backToGuessPlayerNumber()}>BACK</button>
                </div>
                )
            }
        };
        
        useEffect(() => {

            if(beginningNumberRange === '' && endNumberRange === ''){
                
            } else if(beginningNumberRange >= endNumberRange){
                userError();
                setIsUserError(true);
            } else {
                getComputersGuess();
                setIsUserError(false);
            };
        
    }, [beginningNumberRange, endNumberRange]);

    const playingDisplay = () => {
        if(isUserError) {
            console.log('One')
            return userError();
        } else if (isNumberCorrect) {
            console.log('two')
            return numberIsCorrect();
        } else if (iKnowYourNumber) {
            console.log('three computerKnowsYourNumber') 
            return computerKnowsYourNumber();
        } else if (isHigherOrLower) {
            console.log('four')
            return higherOrLower();
        } else null
    };



  return (
    <div id='player-number-guesser-container'>
        {!isComputerGuessing ? (
            <div id='input-range-container'>
                <h3 id='give-number-range-text'>Ok think of a number and give me a range of numbers to guess between.</h3>

                <form id='player-number-guesser-form' onSubmit={handleFormSubmitBeginningEnd}>
                    <div id='form-inputs-container'>
                        <input 
                            id='beginning-number-text'
                            name='beginningNumber' 
                            type='number' 
                            onChange={handleGrowOne}
                            style={inputStyleOne}
                            required>
                        </input>

                        <input 
                            id='end-number-text'
                            name='endNumber' 
                            type='number'
                            onChange={handleGrowTwo}
                            style={inputStyleTwo}
                            required>
                        </input>
                </div>

                    <button id='player-number-submit-button' type='submit'>Submit</button>

                </form>
            </div>
        ) : null}
        {playingDisplay()}
        {/* {isUserError ? userError() : null}
            {halfBetweenBeginAndEnd ? (
        <div id='guess-player-number-game-container'>
                <h3 id='is-your-number'>Is your number {halfBetweenBeginAndEnd}?</h3>
            {isHigherOrLower ? higherOrLower() : null}
            {iKnowYourNumber ? computerKnowsYourNumber() : null}
            {isNumberCorrect ? numberIsCorrect() : null}
        </div>
                ) : null} */}

    </div>
  )
}

export default playerNumberGuesser;