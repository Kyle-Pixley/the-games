import React, {useEffect, useState} from 'react'
import './DealersHand.css'

function DealersHand({ deck, dealersHand, dealersScore, setDealersScore, isFlipped, setIsFlipped, setDealerBust }) {

    const displayDealersHand = () => {
        if(Object.keys(dealersHand).length !== 0){
            const cardImages = dealersHand.dealersTwoCards.cards.map((card, i) => (
                i === 1 ? 
                    hiddenCard(card, i)
                    :
                    <img className='dealers-card-images' id={dealersCardRotation(i)} key={`dealerCardImage${i}`} src={card.image} alt={`Card ${i + 1}`}/>
            ));
            return cardImages;
        }
    };

    const hiddenCard = (card, i) => {
        return (
            <div id='dealers-card-front-back-container'>
                {isFlipped ? (
                    <img className='dealers-card-images' id='dealers-card-number-1' key={`front ${i}`} src={card.image} alt={`Card ${i + 1}`} />
                    )
                    : (
                        <img className='dealers-card-images' id='dealers-card-number-1-back' key={`back ${i}`} src='https://deckofcardsapi.com/static/img/back.png' alt={`Back of Card ${i + 1}`} />
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
            if(dealersScore > 21) {
                setDealerBust(true);
            }
        }
    }, [dealersHand]);

    const dealersScoreValue = () => {
        if(dealersHand.dealersTwoCards.cards[1].value === "JACK" || dealersHand.dealersTwoCards.cards[1].value === "QUEEN" || dealersHand.dealersTwoCards.cards[1].value === "KING") {
            return Number(10)
        } else if (dealersHand.dealersTwoCards.cards[1].value === "ACE") {
            if(dealersScore - 11 <= 10) {
                return Number(11)
            } else return Number(1)
        } else return Number(dealersHand.dealersTwoCards.cards[1].value)
    }



    const displayDealersScoreIfFlipped = () => {
        if(!isFlipped && dealersHand) {
            return (
                <h2>{dealersScore - dealersScoreValue()}+?</h2>
            )
        } else return (<h2>{dealersScore}</h2>)
    }



  return (
    <div id='dealers-hand-container'>
        <div id='dealers-spot-container'>
            <div>
                {displayDealersScoreIfFlipped()}
            </div>
            <div id='dealers-card-images-container'>
                {displayDealersHand()}
            </div>
        </div>
    </div>
  )
}

export default DealersHand