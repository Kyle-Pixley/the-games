import React, {useEffect, useState} from 'react'
import './DealersHand.css'

function DealersHand({ dealersHand, dealersScore, setDealersScore, isFlipped, setIsFlipped }) {


    const displayDealersHand = () => {
        if(Object.keys(dealersHand).length !== 0){
            const cardImages = dealersHand.dealersTwoCards.cards.map((card, i) => (
                //! --------------
                i === 1 ? 
                    hiddenCard(card, i)
                    :
                    <img className='dealers-card-images' id={dealersCardRotation(i)} key={i} src={card.image} alt={`Card ${i + 1}`}/>
            ));
            return cardImages;
        }
    };


    const flipCard = () => {
        setIsFlipped(!isFlipped);
    }
    const hiddenCard = (card, i) => {
        return (
            <div id='dealers-card-front-back-container'>
                {isFlipped ? (
                    <img className='dealers-card-images' id='dealers-card-number-1' key={i+'front'} src={card.image} alt={`Card ${i + 1}`}  onClick={flipCard}/>
                    )
                    : (
                        <img className='dealers-card-images' id='dealers-card-number-1-back' key={i+'back'} src='https://deckofcardsapi.com/static/img/back.png' alt={`Back of Card ${i + 1}`}  onClick={flipCard}/>
                    )
                }  
            </div>
            )
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