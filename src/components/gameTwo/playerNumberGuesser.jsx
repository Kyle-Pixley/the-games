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

const inputStyle = {
    width: `${inputGrowSizeOne.length * 22}px`,
};
const handleGrow = (e) => {
    setInputGrowSizeOne(e.target.value)
};

    const handleFormSubmitBeginningEnd = e => {
        e.preventDefault();
        console.log("Form submit number 2 hit")
        setBeginningNumberRange(Number(e.target.beginningNumber.value));
        setEndNumberRange(Number(e.target.endNumber.value));
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
                <h3>I know your number is {halfBetweenBeginAndEnd} so don't lie</h3>
            </div>
        )
    }
    const higherOrLower = () => {
        return (
            <div>
                <div>
                    <button onClick={numberIsHigher}>Higher</button>
                    <button onClick={numberIsLower}>Lower</button>
                </div>
                <div>
                    <button onClick={ () => setIsNumberCorrect(true)}>Correct</button>
                </div>
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
        <h3 id='give-number-range-text'>Ok think of a number and give me a range of numbers to guess between.</h3>

        <form id='player-number-guesser-form' onSubmit={handleFormSubmitBeginningEnd}>
            <div id='form-inputs-container'>
                <input id='beginning-number-text'
                    name='beginningNumber' 
                    type='number' 
                    onChange={handleGrow}
                    style={inputStyle}
                    required>
                </input>

                <input 
                    id='end-number-text'
                    name='endNumber' 
                    type='number'
                    onChange={handleGrow}
                    style={inputStyle}
                    required>
                </input>
            </div>

            <button id='player-number-submit-button' type='submit'>Submit</button>

        </form>
        {isUserError ? userError() : null}
        {halfBetweenBeginAndEnd ? (<h3>Is your number {halfBetweenBeginAndEnd}?</h3>) : null}
        {isHigherOrLower ? higherOrLower() : null}
        {iKnowYourNumber ? computerKnowsYourNumber() : null}
        {isNumberCorrect ? numberIsCorrect() : null}

    </div>
  )
}

export default playerNumberGuesser;