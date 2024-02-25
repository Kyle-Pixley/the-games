import React, {useEffect} from 'react'
import './PlayersHand.css'

function PlayersHand({ playersHand }) {

    const displayPlayersHand = () => {
        if(Object.keys(playersHand).length !== 0){
            const cardImages = playersHand.twoCards.cards.map((card, i) => (
                <img className='players-card-images' id={`players-card-number-${i}`} key={i} src={card.image} alt={`Card ${i + 1}`}/>
            ));
            return cardImages;
        }
    };
    const displayPlayersScore = () => {
        const totalValue = playersHand.twoCards.cards.reduce((acc, card) => {
            const numericValue = parseFloat(card.value);
                return isNaN(numericValue) ? acc : acc + numericValue;
            }, 0);
        return totalValue;
    }
    //todo if the card is a face card the value is a string of what that face card is "JACK" "KING"... so handle those cases monday

  return (
    <div id='players-hand-container'>

        {playersHand ? (
                <div id='players-spot-container'>
                    <div>
                        {displayPlayersHand()}
                    </div>
                    <div>
                        {displayPlayersScore()}
                    </div>
                </div>
            ) : <h1 id='title-banner'>PlayersHand</h1>}
        <div id='players-score'>
        </div>
    </div>
  )
}

export default PlayersHand;