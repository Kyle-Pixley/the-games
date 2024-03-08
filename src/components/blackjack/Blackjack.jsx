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
    const [ dealerBust, setDealerBust ] = useState(false);
    const [ isStand, setIsStand ] = useState(false);
    const [ isFlipped, setIsFlipped ] = useState(false);
    const [ isRoundOver, setIsRoundOver ] = useState(false);

    const nextRound = () => {
        // todo The deck still = the deck so this does not go back to the bet page. Need to change fetching the original deck to be a useEffect with no dependency and figure out how to change the logic {deck?'game play':'first page'}
        setPlayersHand('');
        setDealersHand('');
        setPlayerBust(false);
        //todo when player busts and hit nextRound() it immediately goes to the bust page once more need to set this t
        setDealerBust(false);
        setIsStand(false);
        setIsFlipped(false);

        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/return/`)

        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
            .then(res => res.json())
            .then(shuffledDeck => {
                setDeck(shuffledDeck)
            })
            .catch(err => console.log(err, " shuffle error"))
        
    }

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

        const playerStands = () => {
            setIsStand(true);
            setIsFlipped(true);
        };

        useEffect(() => {
            if(isStand){
                if(17 > dealersScore && playerScore != 21 && dealersScore < 21){
                    dealerHitStand();
                }

                if (dealersScore > 21 || dealersScore > playerScore || playerScore === 21) {
                    playerPointsLogic();
                }

            }
        }, [isStand,dealersScore]);

    const playerPointsLogic = () => {
        console.log('player points logic')
        if(playerScore === 21) {
        console.log("one")
            setPlayerPoints(playerPoints + (pot * 2.5))
            setPot(0)
        } else if(playerScore > dealersScore || (dealersScore > 21 && playerScore <= 21)) {
            console.log("two")
            setPlayerPoints(playerPoints + (pot * 2))
            setPot(0)
        } else if(playerScore === dealersScore) {
            console.log("three")
            setPlayerPoints(playerPoints + pot)
            setPot(0)
        } else if(playerScore < dealersScore) {
            console.log("four")
            setPot(0)
        } else if(playerScore === dealersScore) {
            console.log('five')
            setPlayerPoints(playerPoints + pot)
            setPot(0)
        }
    };

    const dealerHitStand = () => {
        console.log('this ran')
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
                    <div>
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
                    <button
                    id='next-round-button'
                    onClick={() => nextRound()}>
                        Next Round
                    </button>
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
                {deck ? null
                    : (
                        <div id='pre-game-buttons'>
                        <button
                        id='draw-cards-button'
                        //! HERE change this so the it is not a brand new deck every round
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