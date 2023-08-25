import logo from './logo.svg';
import './App.css';
import Heater from './components/Panels/Heater.js';
import Joint from './components/Panels/Joint.js';
import System from './components/Panels/System.js';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay}) {


  function handleClick(i) {

    if (squares[i] || calculateWinner(squares)) {
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
  const winner = calculateWinner (squares);
  let status;
  if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  return (
  <>
  <div className="status">{status}</div>
  <div className="board-row">
    <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
    <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
    <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
  </div>
  <div className="board-row">
    <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
    <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
    <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
  </div>
  <div className="board-row">
    <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
    <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
  </div>
  </>
  );
}

function Square({value, onSquareClick}) {
  return (
     <button className="square" onClick={onSquareClick}>
            {value}
            </button>
  );
}

function calculateWinner (squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setHistory([...history, nextSquares]);
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
  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
      <ol> {moves}</ol> 
      </div>
    </div>
  );
}

function Panel() {
  return <div>
    <System/>
    <Box sx={{p: 2}}>
    <Stack spacing={2}>
    <Heater/>
    <Heater/>

     <Joint name={"X axis"}/>
     <Joint name={"Y axis"}/>
     <Joint name={"Extruder"}/>
 
    </Stack>
    </Box>
  </div>
}
function JointShow() {
  
  return (
    <>
    <div className="JointShow">
      x axis = 0
      </div>
    <div>
      <Button variant="contained">Hello world</Button>
    </div>
    </>
  );
}

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/data');
      const received = await response.json();
      setData(received);
    };
    fetchData();

    // Set up the interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>My Data:</h1>
      {data ? (
        <div>
          <p>{data.id}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

export default Panel;
