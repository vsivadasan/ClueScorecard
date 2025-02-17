import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const suspects = ["Colonel Mustard", "Professor Plum", "Green", "Mr. Peacock", "Miss Scarlet", "Mrs. White"];
  const weapons = ["Knife", "Candle stick", "Revolver", "Rope", "Lead pipe", "Wrench"];
  const rooms = ["Hall", "Lounge", "Dining room", "Kitchen", "Ballroom", "Conservatory", "Billiard room", "Library", "Study"];
  return (
    // <div className="game">
    //   <div className="game-board">
    //     <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    //   </div>
    //   <div className="game-info">
    //     <ol>{moves}</ol>
    //   </div>
    // </div>
    <div className="sheet">
      <Section className="section" title="Suspect" entries={suspects}/>
      <Section title="Weapons" entries={weapons}/>
      <Section title="Rooms" entries={rooms}/>
    </div>
  );
}

function Section({title, entries}){
  const renderedEntries = entries.map((entry) => {
    return (
    <>
    <div className='sectionRow'>
      <div className='sectionRowEntryTitle'>
        {entry}
      </div>
        <div className='sectionEntries'>
            <div className='sectionEntry'><Square key={entry + 1} value="X" onSquareClick={() => {}} /></div>
            <div className='sectionEntry'><Square key={entry + 2} value="X" onSquareClick={() => {}} /></div>
            <div className='sectionEntry'><Square key={entry + 3} value="X" onSquareClick={() => {}} /></div>
            <div className='sectionEntry'><Square key={entry + 4} value="X" onSquareClick={() => {}} /></div>
            <div className='sectionEntry'><Square key={entry + 5} value="X" onSquareClick={() => {}} /></div>
            <div className='sectionEntry'><Square key={entry + 6} value="X" onSquareClick={() => {}} /></div>
        </div>
      </div>
    </>
  );
  });
  return (
  <>
  <div className='sectionTitle'>{title}</div>
  <div className='sectionTable'>{renderedEntries}</div>
  </>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
