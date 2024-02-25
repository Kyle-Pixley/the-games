import React, { useState, useEffect } from 'react'
import PlayersHand from './playersHand/PlayersHand';
import DealersHand from './DealersHand/DealersHand';
import './Blackjack.css'

function Blackjack() {

    const [ deck, setDeck ] = useState('');
    const [ playersHand, setPlayersHand ] = useState('');
    const [ dealersHand, setDealersHand ] = useState([]);

    const fetchDeck = () => {
        fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then(res => res.json())
            .then(deck => {
                setDeck(deck)
            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        if(deck != '') {
            drawTwoCards();
        }
    },[deck])

    const drawTwoCards = () => {
        const deckId = deck.deck_id
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
            .then(res => res.json())
            .then(twoCards => {
                console.log(twoCards)
                setPlayersHand({twoCards})
            })
            .catch(err => console.log(err))
    };
    const addCardToPlayer = () => {
        console.log('Add Card To Player ((((No functionality!!))))')
    }
    
    //add more cards to players hand
    const hitMoreCardsButton = () => {
        if(Object.keys(playersHand).length !== 0) {
            return (
                <button 
                id='hit-button'
                onClick={() => addCardToPlayer()}>
                    Hit Me!
                </button>
            )
        }
    };


    return (
        <div id='blackjack-container'>

            <DealersHand dealersHand={dealersHand} />

            <PlayersHand playersHand={playersHand} className='players-hand' />

            <div id='buttons-for-game'>
                {deck ? null 
                    : (
                    <button onClick={() => fetchDeck()}>Play</button>
                    )}
                {hitMoreCardsButton()}
            </div>
        </div>
    )
}

export default Blackjack;