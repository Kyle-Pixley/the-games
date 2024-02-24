import React, {useEffect} from 'react'
import './PlayersHand.css'

function PlayersHand({ playersHand }) {

    const displayPlayersHand = () => {
        if(Object.keys(playersHand).length !== 0) {
            const imagesOfCards = playersHand.twoCards.cards.map(img => img.images.svg)
            return imagesOfCards;
        }
    }
    // todo Not displaying images ^^ needs an await???

    // ! Do I need to make my own deck instead of Using an API ????
    // That will take so long but it will be fun and get a lot of typing practice 
    // deck = [
    //     {
    //         'code':'6H',
    //         'image':'sixOfHeartsImage',
    //         'value':'6',
    //         'suit':'HEARTS'
    //     }
    // ]

  return (
    <div>
        {playersHand ? (
                <img id='image' src={displayPlayersHand()}/>
            ) : <h1>Nope</h1>}
    </div>
  )
}

export default PlayersHand;