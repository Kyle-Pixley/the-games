import React, { useState } from 'react';
import './Pot.css';
import WhiteChip from '../../../assets/white-chip-text.png';
import BlueChip from '../../../assets/blue-chip-text.png';
import RedChip from '../../../assets/red-chip-text.png';
import GreenChip from '../../../assets/green-chip-text.png';

function Pot({ pot, setPot}) {

  const [ whitePokerChip, setWhitePokerChip ] = useState(false);
  const [ bluePokerChip, setBluePokerChip ] = useState(false);
  const [ redPokerChip, setRedPokerChip ] = useState(false);
  const [ greenPokerChip, setGreenPokerChip ] = useState(false);
  

  const potOver50 = () => {
    if(pot % 50 === 0) {
      return (
        <div>
          <img src={GreenChip}/>
        </div>
      )
    } else if(pot % 10 === 0 && pot % 50 != 0) {
      return (
        <div>
          <img src={RedChip} />
          <img src={GreenChip} />
        </div>
      )
    }
  }

  const potImage = () => {
    if(pot >= 50) {
      return potOver50();
    }
  }

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