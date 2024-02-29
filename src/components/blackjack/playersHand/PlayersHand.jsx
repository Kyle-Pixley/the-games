import React, {useEffect, useState} from 'react'
import './PlayersHand.css'

function PlayersHand({ playersHand, playerScore, setPlayerScore, playerPoints, setPlayerPoints, playerBust, setPlayerBust, setPot }) {

    const displayPlayersHand = () => {
        if(Object.keys(playersHand).length !== 0){
            const cardImages = playersHand.twoCards.cards.map((card, i) => (
                <img className='players-card-images' id={`players-card-number-${i}`} key={i} src={card.image} alt={`Card ${i + 1}`}/>
            ));
            return cardImages;
        }
    };
    const displayPlayersScore = () => {
        console.log(playersHand.twoCards)
        const totalValue = playersHand.twoCards.cards.reduce((acc, card) => {
            let numericValue;
            if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
                numericValue = 10;
            } else  if(card.value === "ACE") {
                numericValue = 1;
                if(acc + 11 <= 21) {
                    numericValue = 11;
                } 
            } else {
                numericValue = parseFloat(card.value);
                numericValue = isNaN(numericValue) ? 0 : numericValue;
            }
            return acc + numericValue;
        }, 0);
        setPlayerScore(totalValue);
    };

    useEffect(() => {
        if(playersHand != ''){
            displayPlayersScore();
            console.log(playersHand)
        }
    }, [playersHand]);
    useEffect(() => {
        if(playerScore > 21) {
            setPlayerBust(true);
            setPot(0);
        }
    }, [playerScore])


  return (
    <div id='players-hand-container'>

        {playersHand ? (
                <div id='players-spot-container'>
                    <div>
                        {displayPlayersHand()}
                    </div>
                    <div>
                        <h2>{playerScore}</h2>
                    </div>
                </div>
            ) : (
            <div>
                <h1 id='title-banner'>PlayersHand</h1>
            </div>
            )}
        <div id='players-score'>
        </div>
    </div>
  )
}

export default PlayersHand;