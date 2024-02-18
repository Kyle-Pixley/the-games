import React, { useState, useEffect } from 'react'
import './Home.css'

function Home() {

    // const [ data, setData ] = useState('');

    // const fetchDeck = () => {
    //     fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setData(data);
    //         })
    //         .catch(err => console.log(err))
    // };

    /*
        this ^^^ fetches a deck that has been shuffled and assigned a code 'data.deck_id' then to draw a card you use a different route:
            https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
        with <<deck_id>> being replaced with 'data.deck_id' 
    */

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    return (
        <div>
            {/* <button onClick={() => fetchDeck()}>Click For Data</button> */}
            a;lskdjf;laksjd
        </div>
    )
}

export default Home