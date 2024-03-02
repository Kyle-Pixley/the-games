import React, {useEffect} from 'react'
import './DealersHand.css'

function DealersHand({ dealersHand, dealersScore, setDealersScore }) {

    const displayDealersHand = () => {
        if(Object.keys(dealersHand).length !== 0){
            const cardImages = dealersHand.dealersTwoCards.cards.map((card, i) => (
                //! --------------
                i === 1 ? 
                    <img className='dealers-card-images' id={dealersCardRotation(i)} key={i} src={card.image} alt={`Card ${i + 1}`} style={hiddenCardStyle}/>
                    :
                    <img className='dealers-card-images' id={dealersCardRotation(i)} key={i} src={card.image} alt={`Card ${i + 1}`}/>
                //todo think i will need to create a seperate function for this? ^^ the second card will need two images one for the back and one for the front 
            ));
            return cardImages;
        }
    };

    const hiddenCardStyle = {
        
    }

    const dealersCardRotation = (i) => {
        if(dealersHand.dealersTwoCards.cards.length === 2){
            return `dealers-card-number-${i}`
        } else if(dealersHand.dealersTwoCards.cards.length === 3) {
            return `dealers-card-number-${i}-1`
        } else if(dealersHand.dealersTwoCards.cards.length === 4) {
            return `dealers-card-number-${i}-2`
        }
    };


    const displayDealersScore = () => {
        const totalValue = dealersHand.dealersTwoCards.cards.reduce((acc, card) => {
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
        setDealersScore(totalValue);
    };
    useEffect(() => {
        if(dealersHand != ''){
            displayDealersScore();
        }
    }, [dealersHand])



  return (
    <div id='dealers-hand-container'>
        <div id='dealers-spot-container'>
            <div>
                <h2>{dealersScore}</h2>
            </div>
            <div id='dealers-card-images-container'>
                {displayDealersHand()}
            </div>
        </div>
    </div>
  )
}

export default DealersHand