import React, { useState, useEffect } from 'react'
import PlayersHand from './playersHand/PlayersHand';
import DealersHand from './DealersHand/DealersHand';
import GameOver from '../blackjack/gameOver/GameOver';
import Pot from './Pot/Pot';
import WhiteChip from '../../assets/white-chip-text.png';
import BlueChip from '../../assets/blue-chip-text.png';
import RedChip from '../../assets/red-chip-text.png';
import GreenChip from '../../assets/green-chip-text.png';
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
    const [ dealerBust, setDealerBust ] = useState(false);
    const [ isStand, setIsStand ] = useState(false);
    const [ isFlipped, setIsFlipped ] = useState(false);
    const [ bettingPhase, setBettingPhase ] = useState(true);
    const [ roundNumber, setRoundNumber ] = useState(0);
    const [ isNoMoney, setIsNoMoney ] = useState(false);
    const [ isGameOver, setIsGameOver ] = useState(false);

    const nextRound = () => {
        setRoundNumber(roundNumber + 1);
        shuffleTheDeck();
        setPlayersHand('');
        setDealersHand('');
        setPlayerBust(false);
        setDealerBust(false);
        setDealersScore(0);
        setIsStand(false);
        setIsFlipped(false);
        shuffleTheDeck();
        setBettingPhase(true);
    };

    const shuffleTheDeck = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/return/`)
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
            .then(res => res.json())
            .then(shuffledDeck => {
                setDeck(shuffledDeck)
            })
            .catch(err => console.log(err, " shuffle error"))
    };

    useEffect(() => {
        fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then(res => res.json())
            .then(deck => {
                setDeck(deck)
                setDeckId(deck.deck_id)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if(deck != '' && !bettingPhase) {
            drawTwoCards();
        }
    },[bettingPhase]);

    useEffect(() => {
        if(playerPoints === 0 && pot === 0) {
            setIsGameOver(true);
        }
    }, [playerPoints, pot]);
    
    const drawTwoCards = () => {
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

        const playerStands = () => {
            setIsStand(true);
            setIsFlipped(true);
        };

        useEffect(() => {
            if(isStand){

                if(17 > dealersScore && dealersScore < 21){
                    dealerHitStand();
                } else {
                    playerPointsLogic();
                }
            }
        }, [isStand,dealersScore]);
        
        const dealerHitStand = () => {
                if(dealersScore < 21) {
                    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                    .then(res => res.json())
                    .then(dealerHitCard => {
                        setDealersHand(prevState => ({
                            ...prevState,
                            dealersTwoCards: {
                                ...prevState.dealersTwoCards,
                                cards: [...prevState.dealersTwoCards.cards, dealerHitCard.cards[0]]
                            }
                        }));
                    });
                } 
        };

    const playerPointsLogic = () => {
        console.log('player points logic ran')
        if(playerScore === 21 && dealersScore != 21) {
            setPlayerPoints(playerPoints + (pot * 2.5))
            setPot(0)
        } else if(playerScore > dealersScore || (dealersScore > 21 && playerScore <= 21)) {
            setPlayerPoints(playerPoints + (pot * 2))
            setPot(0)
            console.log('two player points logic')
        } else if(playerScore === dealersScore) {
            setPlayerPoints(playerPoints + pot)
            setPot(0)
        } else if(playerScore < dealersScore) {
            setPot(0)
        };
    };
    
    //add more cards to players hand
    const hitMoreCardsButton = () => {
        if(Object.keys(playersHand).length !== 0) {
            return (
                <div>
                    {isStand ?  (
                        <button
                        id='next-round-button'
                        onClick={() => nextRound()}>
                            Next Round
                        </button>
                    ) : (
                    <div id='hit-stand-button-container'>
                        <button 
                        id='hit-button'
                        onClick={() => addCardToPlayer()}>
                            Hit Me!
                        </button>

                        <button id='stand-button'
                        onClick={() => playerStands()}>
                            Stand
                        </button>
                    </div>
                    )}
                </div>
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
                    <div id='next-round-bust-button-container'>
                        <button
                        id='next-round-button'
                        onClick={() => nextRound()}>
                            Next Round
                        </button>
                    </div>
            </div>
        )
    };


    return (
        <div id='blackjack-container'>
            {playerBust ? 
                playerHasBusted() 
                : (
                    <div id='playing-the-game'>
                    
                    <DealersHand 
                    deck={deck}
                    dealersHand={dealersHand}
                    dealersScore={dealersScore}
                    setDealersScore={setDealersScore}
                    isFlipped={isFlipped}
                    setIsFlipped={setIsFlipped} 
                    setDealerBust={setDealerBust}/>
                    
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
                    {!bettingPhase ? null
                    : (

                isGameOver ? <GameOver /> : 
                        <div id='pre-game-buttons'>
                        <button
                        id='draw-cards-button'
                        onClick={() => setBettingPhase(false)}>Start Round</button>
                        <div id='bet-container'>
                        <h3 id='bet-amount-text'>Bet Amount</h3>
                        <div id='bet-button-container'>
                        <button
                        onClick={() => addToPot(1)}
                        className='bet-buttons'>
                        <img 
                        id='bet-image-1'
                        className='bet-images' 
                        src={WhiteChip}/>
                        </button>
                        <button
                        onClick={() => addToPot(5)}
                        className='bet-buttons'>
                        <img 
                        id='bet-image-5'
                        className='bet-images' 
                        src={BlueChip}/>
                        </button>
                        <button
                        onClick={() => addToPot(10)}
                        className='bet-buttons'>
                        <img 
                        id='bet-image-10'
                        className='bet-images' 
                        src={RedChip}/>
                        </button>
                        <button
                        onClick={() => addToPot(50)}
                        className='bet-buttons'>
                        <img 
                        id='bet-image-50'
                        className='bet-images' 
                        src={GreenChip}/>
                        </button>
                        </div>
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