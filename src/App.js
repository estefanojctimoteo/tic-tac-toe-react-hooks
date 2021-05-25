import React, { useState } from 'react'
import Board from './Board'
import { calculateWinner } from './lib'

const Game = () => {
  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)
  const [history, setHistory] = 
    useState([ { squares: Array(9).fill(null), } ])

  const handleClick = (i) => {
    let localHistory = history.slice(0, stepNumber + 1)
    let localCurrent = localHistory[localHistory.length-1]
    let localSquares = localCurrent.squares.slice()
  
    if (calculateWinner(localSquares) || localSquares[i]) {
      return
    }
    localSquares[i] = xIsNext ? 'X' : 'O'
    setHistory(localHistory.concat([{ squares: localSquares }]))
    setStepNumber(localHistory.length)
    setXIsNext(!xIsNext)  
  }

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const current = history[stepNumber]

  const winner = calculateWinner(current.squares)

  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move #${move}` :
      'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  const status = 
    winner ? `Winner: ${winner}` :
    `Next player: ${(xIsNext ? 'X' : 'O')}`

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  
}
export default Game;
