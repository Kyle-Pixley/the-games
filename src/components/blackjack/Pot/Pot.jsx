import React, { useState, useEffect } from 'react';
import './Pot.css';
import WhiteChip from '../../../assets/white-chip-text.png';
import BlueChip from '../../../assets/blue-chip-text.png';
import RedChip from '../../../assets/red-chip-text.png';
import GreenChip from '../../../assets/green-chip-text.png';

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

    console.log('this ran ', pot)
    let potToString = pot.toString();
    let lastDigit = potToString.slice(-1);
    let secondToLastDigit = potToString.slice(-2,-1);
    console.log(secondToLastDigit)

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
    if (pot >= 10 && pot % 50 != 0 && (secondToLastDigit != '5' || secondToLastDigit != '0')) {
      setRedPokerChip(true);
    };
    if(pot >= 50) {
      setGreenPokerChip(true);
    };
  }, [pot]);

  return (
    <div id='pot-container'>
      <div id='pot-image-container'>
        {whitePokerChip ? ( <img src={WhiteChip} /> ) : null}
        {bluePokerChip ? ( <img src={BlueChip} /> ) : null}
        {redPokerChip ? ( <img src={RedChip} /> ) : null}
        {greenPokerChip ? ( <img src={GreenChip} /> ) : null}
      </div>

        {pot}

    </div>
  )
}

export default Pot 