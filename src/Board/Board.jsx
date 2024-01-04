import React, { useState } from 'react'
import "./Board.css"


function Square({ value, onsquareClick }) {
  return(
    <button className='board_item' onClick={onsquareClick}>{value}</button>
  )
}

const Board = () => {
  const [squareIndex, setSquareIndex] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [restartSession, setRestartSession] = useState(false)

  function calculateWinner(squareIndex) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squareIndex[a] && squareIndex[a] === squareIndex[b] && squareIndex[a] === squareIndex[c]) {
        return squareIndex[a];
      }
    }
    return null;
  }

  

  function handleClick(i) {
    const copysquare = squareIndex.slice()
    if (copysquare[i] || calculateWinner(squareIndex)) {
      return
    }
    if (xIsNext) {
      copysquare[i] = "X"
    }
    else {
      copysquare[i] = "O"
    }
    setSquareIndex(copysquare)
    setXIsNext(!xIsNext)
    
  }

  function restartGame() {
    location.reload()
  }

  const winner = calculateWinner(squareIndex)
  let status;
  if (winner) {
    status = "Winner is: " + winner
    setTimeout(() => {
      setRestartSession(true)
    }, 1000);
  }
  else {
    status = "Next player is: " + (xIsNext ? "X" : "O")
  }



  return (
    <>
      <div className='board_title'>Tic-Tac-Toe</div>
      <div className='board_status'>{status}</div>
      <div className='board_game'>
        <Square value={squareIndex[0]} onsquareClick={() => handleClick(0)} />
        <Square value={squareIndex[1]} onsquareClick={() => handleClick(1)} />
        <Square value={squareIndex[2]} onsquareClick={() => handleClick(2)} />
        <Square value={squareIndex[3]} onsquareClick={() => handleClick(3)} />
        <Square value={squareIndex[4]} onsquareClick={() => handleClick(4)} />
        <Square value={squareIndex[5]} onsquareClick={() => handleClick(5)} />
        <Square value={squareIndex[6]} onsquareClick={() => handleClick(6)} />
        <Square value={squareIndex[7]} onsquareClick={() => handleClick(7)} />
        <Square value={squareIndex[8]} onsquareClick={() => handleClick(8)} />
      </div>

      {restartSession && <button className='board_restart_status' onClick={restartGame}>Play Again</button>}
      
    </>
      
  )
}

export default Board
