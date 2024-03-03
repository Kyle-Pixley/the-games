import React, {useState} from 'react'
import './App.css'
import Home from './components/blackjack/Blackjack';
import GameOne from './components/gameOne/gameOne';
import GameTwo from './components/gameTwo/gameTwo'

function App() {

  const [ activeComponent, setActiveComponent ] = useState('home')

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName)
  };

  return (
    <div id='app-container'>
      <div id='nav-bar'>

        <button 
        onClick={() => handleButtonClick('home')}
        className='nav-buttons' 
        id='home-nav-button'
        >
          Home
          {activeComponent === 'home' && <span className='underline'></span>}
        </button>

        <button 
        onClick={() => handleButtonClick('game-one')}
        className='nav-buttons'
        id='game-one-nav-button'
        >
        Tic Tac Toe
        {activeComponent === 'game-one' && <span className='underline'></span>}
        </button>

        <button
        onClick={() => handleButtonClick('game-two')}
        className='nav-buttons'
        id='game-two-nav-button'
        >
          Number Guesser
          {activeComponent === 'game-two' && <span className='underline'></span>}
        </button>

      </div>
      {activeComponent === 'home' && <Home /> }
      {activeComponent === 'game-one' && <GameOne /> }
      {activeComponent === 'game-two' && <GameTwo /> }
    </div>
  )
}

export default App