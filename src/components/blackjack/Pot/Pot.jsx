import React, { useState, useEffect } from 'react';
import './Pot.css';
import WhiteChip from '../../../assets/white-chip.png';
import BlueChip from '../../../assets/blue-chip.png';
import RedChip from '../../../assets/red-chip.png';
import GreenChip from '../../../assets/green-chip.png';

function Pot({ pot }) {

  const [ whitePokerChip, setWhitePokerChip ] = useState(false);
  const [ bluePokerChip, setBluePokerChip ] = useState(false);
  const [ redPokerChip, setRedPokerChip ] = useState(false);
  const [ greenPokerChip, setGreenPokerChip ] = useState(false);
  

  useEffect(() => {
    setWhitePokerChip(false);
    setBluePokerChip(false);
    setRedPokerChip(false);
    setGreenPokerChip(false);

    let potToString = pot.toString();
    let lastDigit = potToString.slice(-1);
    let secondToLastDigit = potToString.slice(-2,-1);

    if (((pot + 1) % 50 === 0 || (pot + 2) % 50 === 0 || (pot + 3) % 50 === 0 || (pot + 4) % 50 === 0 || (pot + 5) % 50 === 0 || (pot + 6) % 50 === 0 || (pot + 7) % 50 === 0 || (pot + 8) % 50 === 0 || (pot + 9) % 50 === 0) && pot != 0) {
      setRedPokerChip(true)
    }

    if (lastDigit === '1' || lastDigit === '2' || lastDigit === '3' || lastDigit === '4') {
      setWhitePokerChip(true);
    };
    if(lastDigit === '6' || lastDigit === '7' || lastDigit === '8' || lastDigit === '9') {
      setWhitePokerChip(true);
      setBluePokerChip(true);
    }
    if (lastDigit === '5') {
      setBluePokerChip(true);
    };
    if (pot >= 10 && pot % 50 != 0 && !isWithinRange(pot) &&(secondToLastDigit != '5' || secondToLastDigit != '0')) {
      setRedPokerChip(true);
    };
    if(pot >= 50) {
      setGreenPokerChip(true);
    };
  }, [pot]);
  //! when 10 less than a # divisible by 50 the 10 is gone

  //handle image when pot is within 10 over 50
  function isWithinRange(potNumber) {

    const nearestBelow = Math.floor(potNumber / 50) * 50;
    const nearestAbove = Math.ceil(potNumber / 50) * 50;
    
    if (Math.abs(potNumber - nearestBelow) < 10 || Math.abs(potNumber - nearestAbove) < 10) {
      return true;
    } else {
      return false;
    }
  };

  const whatInThePot = () => {
    if (pot != 0){
      return (
        <h2 id='pot-text'>
          ${pot}
        </h2>
      )
    } else return null;
  };


  return (
    <div id='pot-container'>
      <div id='pot-image-container'>
        {whitePokerChip ? ( <img className='pot-chip-images' id='white-chip-pot-image' src={WhiteChip} /> ) : null}
        {bluePokerChip ? ( <img className='pot-chip-images' id='blue-chip-pot-image' src={BlueChip} /> ) : null}
        {redPokerChip ? ( <img className='pot-chip-images' id='red-chip-pot-image' src={RedChip} /> ) : null}
        {greenPokerChip ? ( <img className='pot-chip-images' id='green-chip-pot-image' src={GreenChip} /> ) : null}
          {whatInThePot()}
      </div>


    </div>
  )
}

export default Pot 