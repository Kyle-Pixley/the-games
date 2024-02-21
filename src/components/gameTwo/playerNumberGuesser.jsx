import React, {useState, useEffect} from 'react'
import './playerNumberGuesser.css'

function playerNumberGuesser({ isPlaying }) {

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
        console.log(';alksdjf;alkjsdf;alkjdsf;akldfj;akjdsf;akljds')
        setBeginningNumberRange(Number(e.target.beginningNumber.value));
        setEndNumberRange(Number(e.target.endNumber.value));
        setIsComputerGuessing(true);
    };
    
    const getComputersGuess = () => {
        setHalfBetweenBeginAndEnd(Math.floor(Number((beginningNumberRange + endNumberRange) / 2)))
        console.log(numberOfGuesses)
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
        // todo this triggers when the computer guesses your number correctly 
    };

    const computerKnowsYourNumber = () => {
        return (
            <div>
                <h3>Your number is {halfBetweenBeginAndEnd}!</h3>
            </div>
        )
    }
    const higherOrLower = () => {
        return (
            <div id='high-low-correct-buttons-container'>
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
    
    const userError = () => {
        console.log('this is for any errors the user makes when selecting numbers')
        //! This needs to be fixed to account for when the game has started with no error 
        if(beginningNumberRange >= endNumberRange) {
            return (
                <h3>The end number needs to be greater than the beginning number.</h3>
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
        
    }, [beginningNumberRange, endNumberRange])



  return (
    <div id='player-number-guesser-container'>
        {!isComputerGuessing ? (
            <div>
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

        {isUserError ? userError() : null}
        <div id='guess-player-number-game-container'>
            {halfBetweenBeginAndEnd ? (
                <h3 id='is-your-number'>Is your number {halfBetweenBeginAndEnd}?</h3>
                ) : null}
            {isHigherOrLower ? higherOrLower() : null}
            {iKnowYourNumber ? computerKnowsYourNumber() : null}
            {isNumberCorrect ? numberIsCorrect() : null}
        </div>

    </div>
  )
}

export default playerNumberGuesser;