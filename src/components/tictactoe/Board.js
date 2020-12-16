import React, {Component, useState} from "react";
import Square from "./Square";

// class Board extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             squares: Array(9).fill(null),
//             xIsNext: true
//         }
//     }
//
//     // обработчик нажатия на кнопку
//     handleClick(i) {
//         // debugger;
//         const squaresCopy = this.state.squares.slice(); // создать копию массива из состояния squares
//
//         // отмена повторного нажатия на элемент, и отмена при ничье и победе
//         if (!squaresCopy[i] && !calculateWinner(squaresCopy)) {
//             this.state.xIsNext ? squaresCopy[i] = 'X' : squaresCopy[i] = '0';
//
//             let randomIndex;
//             do {
//                 if(!squaresCopy.includes(null)) break;
//                 randomIndex = Math.floor(Math.random() * 9); // получаем случ. целое число от 0 до 8 вкл.
//             } while (squaresCopy[randomIndex] !== null);
//             squaresCopy[randomIndex] = '0';
//
//             this.setState({
//                 xIsNext: true, // меняем каждый ход значение на противоположное
//                 squares: squaresCopy
//             });
//         }
//     }


function Board(props) {

    console.log(arguments);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i) {
        const squaresCopy = squares.slice(); //создать копию массива из состояния

        //отмена повторного нажатия на элемент при ничье или победе
        if (!squaresCopy[i] && !calculateWinner(squaresCopy)) {
            xIsNext ? squaresCopy[i] = 'X' : squaresCopy[i] = '0';

            let randomNum;
            do {
                if (!squaresCopy.includes(null)) break;
                randomNum = Math.floor(Math.random() * 9);
            } while (squaresCopy[randomNum] !== null);

            squaresCopy[randomNum] = '0';
            setSquares(() => squaresCopy);
            setXIsNext(() => true);
        }
    }

    function renderSquare(i) {
        return <Square value={squares[i]} onClick={() => handleClick(i)}/>
    }

    let winner = calculateWinner(squares);
    let status = null;

    if (winner && winner !== 'draw') {
        status = `Победил: ${winner}`;
    } else if (winner === 'draw') {
        status = `НИЧЬЯ!!!`;
    } else {    status = `Сейчас ходит: ${xIsNext ? 'X' : '0'}`;
    }

    return (
        <div>
            <div className={"status"}>
                <h4>{status}</h4>
            </div>
            <div className={"board-row"}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}

            </div>
            <div className={"board-row"}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className={"board-row"}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

function calculateWinner(squaresCalc) {
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

    const winner = lines.filter(([a, b, c]) => squaresCalc[a] && squaresCalc[a] === squaresCalc[b] && squaresCalc[a] === squaresCalc[c]);
    console.log(winner);
    if (winner.length !== 0) {
        return squaresCalc[winner[0][0]];
    } else if (!squaresCalc.includes(null)) {
        return 'drow';
    }
    return false;
}

export default Board;