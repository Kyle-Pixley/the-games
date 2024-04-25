import React, {useEffect} from 'react'
import './DealersHand.css'

function DealersHand({ dealersHand, dealersScore, setDealersScore, isFlipped, setDealerBust }) {

    const displayDealersHand = () => {
        if(Object.keys(dealersHand).length !== 0){
            const cardImages = dealersHand.dealersTwoCards.cards.map((card, i) => (
                i === 1 ? 
                    hiddenCard(card, i)
                    :
                    <img className='dealers-card-images' 
                    id={dealersCardRotation(i)} 
                    key={`dealerCardImage${i}`} 
                    src={card.image} 
                    alt={`Card ${i + 1}`}/>
            ));
            return cardImages;
        }
    };

    const hiddenCard = (card, i) => {
        const key = isFlipped ? `front-${i}` : `back-${i}`
        return (
            <div id='dealers-card-front-back-container'>
                {isFlipped ? (
                    <img className='dealers-card-images' id={`dealers-card-number-${i}`} key={key} src={card.image} alt={`Card ${i + 1}`} />
                    )
                    : (
                        <img className='dealers-card-images' id={`dealers-card-number-${i}-back`} key={key} src='https://deckofcardsapi.com/static/img/back.png' alt={`Back of Card ${i + 1}`} />
                    )
                }  
            </div>
            )
        }

        const dealersCardRotation = (i) => {
            const cardLength = dealersHand.dealersTwoCards.cards.length
            if (i < cardLength) {
                if (cardLength === 2) {
                    return `dealers-card-number-${i}`
                } else if (cardLength === 3) {
                    return `dealers-card-number-${i}-1`
                } else if (cardLength === 4) {
                    return `dealers-card-number-${i}-2`
                }
            }
            return `dealers-card-number-${i}`
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
        if(dealersScore === 0) {
            null;
        } else if (!isFlipped && dealersHand && dealersScore != 0) {
            return (
                <p>{dealersScore - dealersScoreValue()}+?</p>
            )
        } else return (<p>{dealersScore}</p>)
    };



  return (
    <div id='dealers-hand-container'>
        <div id='dealers-spot-container'>
            <div>
                <h2 id='dealers-score'>
                    {displayDealersScoreIfFlipped()}
                </h2>
            </div>
            <div id='dealers-card-images-container'>
                {displayDealersHand()}
            </div>
        </div>
    </div>
  )
}

export default DealersHand