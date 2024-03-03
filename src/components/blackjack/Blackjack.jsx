import React, { useState, useEffect } from 'react'
import PlayersHand from './playersHand/PlayersHand';
import DealersHand from './DealersHand/DealersHand';
import Pot from './Pot/Pot';
import WhiteChip from '../../assets/white-chip.png';
import BlueChip from '../../assets/blue-chip.png';
import RedChip from '../../assets/red-chip.png';
import GreenChip from '../../assets/green-chip.png';
import BlackChip from '../../assets/black-chip.png';
import './Blackjack.css';

function Blackjack() {

    const [ deck, setDeck ] = useState('');
    const [ playersHand, setPlayersHand ] = useState('');
    const [ playerScore, setPlayerScore ] = useState(0);
    const [ playerPoints, setPlayerPoints ] = useState(500);
    const [ dealersHand, setDealersHand ] = useState('');
    const [ dealersScore, setDealersScore ] = useState(0);
    const [ deckId, setDeckId ] = useState('');
    const [ pot, setPot ] = useState(0);
    const [ playerBust, setPlayerBust ] = useState(false);
    const [ isFlipped, setIsFlipped ] = useState(false);


    const fetchDeck = () => {
        fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then(res => res.json())
            .then(deck => {
                setDeck(deck)
                setDeckId(deck.deck_id)
            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        if(deck != '') {
            drawTwoCards();
        }
    },[deck])
    
    const drawTwoCards = () => {
        // setDeckId(deck.deck_id)
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(twoCards => {
            setPlayersHand({twoCards})
            computerDrawTwoCards();
            })
            .catch(err => console.log(err))
    };
    const computerDrawTwoCards = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
            .then(res => res.json())
            .then(dealersTwoCards => {
                setDealersHand({dealersTwoCards})
            })
            .catch(err => console.log(err))
    };

    const addCardToPlayer = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(res => res.json())
            .then(hitCard => {
                console.log(hitCard, 'this here should only be one card')
                setPlayersHand(prevState => ({
                    ...prevState,
                    twoCards: {
                        ...prevState.twoCards,
                        cards: [...prevState.twoCards.cards, hitCard.cards[0]]
                    }
                }));
            })
            .catch(err => console.log(err));
    };
    
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
    const addToPot = (amount) =>{
        if(amount <= playerPoints) {
            setPot(pot + amount)
            setPlayerPoints(playerPoints - amount)
        } else null
    };
    const playerHasBusted = () => {
        return (
            <div id='busted-container'>
                <h1 id='busted-title'>BUST!</h1>
                <PlayersHand
                    playersHand={playersHand} 
                    playerScore={playerScore} 
                    setPlayerScore={setPlayerScore} 
                    playerPoints={playerPoints}
                    setPlayerPoints={setPlayerPoints}
                    className='players-hand'
                    playerBust={playerBust}
                    setPlayerBust={setPlayerBust} 
                    setPot={setPot}/>
            </div>
        )
    }


    return (
        <div id='blackjack-container'>
            {playerBust ? 
            playerHasBusted() 
            : (
                <div>
                
                <DealersHand 
                dealersHand={dealersHand}
                dealersScore={dealersScore}
                setDealersScore={setDealersScore}
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped} />

            <Pot pot={pot} setPot={setPot}/>

            <PlayersHand 
            playersHand={playersHand} 
            playerScore={playerScore} 
            setPlayerScore={setPlayerScore} 
            playerPoints={playerPoints}
            setPlayerPoints={setPlayerPoints}
            className='players-hand'
            playerBust={playerBust}
            setPlayerBust={setPlayerBust} 
            setPot={setPot}/>

            <div id='buttons-for-game'>
                {deck ? null
                    : (
                        <div id='pre-game-buttons'>
                        <button
                        id='draw-cards-button'
                        onClick={() => fetchDeck()}>Draw Cards</button>
                        <div id='bet-container'>
                            <h3>Bet Amount</h3>
                            <div id='bet-button-container'>
                                <button
                                onClick={() => addToPot(1)}
                                className='bet-buttons'>
                                    <img className='bet-images' src={WhiteChip}/>
                                    <p className='bet-text' id='bet-text-1'>$1</p>
                                </button>
                                <button
                                onClick={() => addToPot(5)}
                                className='bet-buttons'>
                                    <img className='bet-images' src={BlueChip}/>
                                    <p className='bet-text' id='bet-text-2'>$5</p>
                                </button>
                                <button
                                onClick={() => addToPot(10)}
                                className='bet-buttons'>
                                    <img className='bet-images' src={RedChip}/>
                                    <p className='bet-text' id='bet-text-3'>$10</p>
                                </button>
                                <button
                                onClick={() => addToPot(50)}
                                className='bet-buttons'>
                                    <img className='bet-images' src={GreenChip}/>
                                    <p className='bet-text' id='bet-text-4'>$50</p>
                                </button>
                                <button
                                onClick={() => addToPot(100)}
                                className='bet-buttons'>
                                    <img className='bet-images' src={BlackChip}/>
                                    <p className='bet-text' id='bet-text-5'>$100</p>
                                </button>
                            </div>
                            {/* white = 1, blue = 5, red = 10,  green = 50, black = 100*/}
                        </div>
                    </div>
                    )}
                {hitMoreCardsButton()}
                <h2 id='player-points'>${playerPoints}</h2>
            </div>
            </div>
            )}
        </div>
    )
}

export default Blackjack;