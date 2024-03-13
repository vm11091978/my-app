'use client';

import { useState } from 'react';

function Square({value, onSquareClick}) {
  const str = JSON.stringify({value});
  console.log('clicked ' + str);

  return (<button className="square" onClick={onSquareClick} >{value}</button>);
}

function Squarewin({value}) {
  const str = JSON.stringify({value});
  console.log('clicked-win ' + str);

  return (<button className="square" style={{ backgroundColor: "tan" }} >{value}</button>);
}

function Board({ xIsNext, squares, onPlay }) {
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

    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner && winner[0] === 'notwin') {
    status = 'Никто не победил'.replace(/ /g, '\u00A0');
  } else if (winner) {
    status = 'Winner: '.replace(/ /g, '\u00A0') + winner[0];
  } else {
    status = 'Next player: '.replace(/ /g, '\u00A0') + (xIsNext ? 'X' : 'O');
  }

  // создадим два цикла для создания квадратов вместо их жесткого кодирования
  const rows = [];
  for (let i = 0; i < 9; i+=3) {
    const elems = [];
    for (let j = 0; j < 3; j++) {
      if (winner && winner[1].indexOf(i+j) !== -1) {
        elems.push(
          <Squarewin key={i+j} value={squares[i+j]} />
        );
      } else {
        elems.push(
          <Square key={i+j} value={squares[i+j]} onSquareClick={() => handleClick(i+j)} />
        );
      }
    }
    rows[i/3] = <div key={i/3} className="board-row" style={{ whiteSpace: "nowrap" }} >{elems}</div>;
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  // const [history, setHistory] = useState([Array(9).fill(null)]);
  const [history, setHistory] = useState([[Array(9).fill(null), null]]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove][0];
  const [squareClick, setSquareClick] = useState(-1);

  console.log(history);

  function handlePlay(nextSquares, squareClick) {
    // скопируем массив историй с нуля по текущий ход и добавим в него новую историю
    const nextHistory = [...history.slice(0, currentMove + 1), [nextSquares, squareClick]];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setSquareClick(squareClick);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // перебираем исторический массив: move - это ключ, squares - это значение
  const moves = history.map((squares, move) => {
    let description;
    // местоположение для каждого хода - найдём сначала строку и затем столбец
    const line = Math.ceil((squares[1] + 1)/3);
    const column = squares[1] - 3 *line + 4;

    if (move === 0 && history.length === 1) {
      description = 'Game start';
    } else if (move === 0 && move === currentMove) {
      return (
        <li key={move}><p style={{ color: 'brown' }} >
          Вы находитесь на шаге #0
        </p></li>
      );
    } else if (move === currentMove) {
      return (
        <li key={move}><p style={{ color: "brown" }} >
          Вы находитесь на шаге #{move} ход (строка, столбец): {line}, {column}
        </p></li>
      );
    } else if (move === 0) {
      description = 'Go to game start';
    } else {
      console.log('squareClick ' + squareClick);
      description = 'Go to move #' + move + ' ход (строка, столбец): ' + line + ', ' + column;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} >{description}</button>
      </li>
    );
  });

  return (
    <div className="game self-start">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // squares[a], squares[b] или squares[c] - это null, "O" или "X"
    // если все три squares - "O", то победил "O", - если "X", то победил "X"
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log('lineswin ' + i);
      return [squares[a], lines[i]];
    }
    // если в массиве squares нет ни одного null, значит всё поле заполнено "O" и "X"
    // следующий ниже код должен выполниться только на последней (9-ой) итерации цикла
    else if (squares.indexOf(null) === -1 && lines.length === i + 1) {
      console.log('notwin');
      return ['notwin', [-1]];
    }
  }

  return null;
}
