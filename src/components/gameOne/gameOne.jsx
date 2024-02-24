import React, { useState } from 'react'
import './gameOne.css'

function gameOne() {

  const initialBoard = [
    ['','',''],
    ['','',''],
    ['','','']
  ];

  const [ board, setBoard ] = useState(initialBoard);
  const [ currentPlayer, setCurrentPlayer ] = useState('X');
  const [ winner, setWinner ] = useState(null);
  const [ tie, setTie ] = useState(0);

  const handleClick = ( row, column ) => {
    setTie(tie + 1);
    if (board[row][column] === '' && !winner) {
      const newBoard = [...board];
      newBoard[row][column] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

      if (isWinner()) {
        setWinner(currentPlayer + " Wins!");
      }
      if(tie === 8) {
        if (isWinner()) {
          setWinner(currentPlayer + " Wins!")
        } else
        // if !isWinner() && something 
        {setWinner("The game is a tie.")}
      }
    }
  };
  const isWinner = () => {
    for(let i = 0; i < 3; i++) {
      if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
        return true;
      }
      if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ''){
        return true;
      }
    }
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ''){
      return true;
    }
    if(board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== '') {
      return true;
    }
    return false;
  }

  const restartGame = () => {
    setBoard(initialBoard)
    setWinner(null)
    setTie(0)
    setCurrentPlayer('X')
  }

  return (
    <div id='tic-tac-toe-container'>
      <h1 id='tic-tac-toe-title'>Tic Tac Toe</h1>
      <table id='table'>
  <tbody id='table-body'>
    {board.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, columnIndex) => (
          <td key={columnIndex}
          id={`cell-${rowIndex}-${columnIndex}`}
          onClick={() => handleClick(rowIndex, columnIndex)}>
            {cell}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
    {winner ? (
      <div id='winner-container'>
        <p id='winner-text'>{winner}</p>
        <button id='new-game-button' onClick={() => restartGame()}>Play Again</button>
      </div>
    ) : (
      <p id='current-player'>Current Player: {currentPlayer}</p>
    )}

    </div>
  )
}

export default gameOne;