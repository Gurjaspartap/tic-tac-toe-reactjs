import React, { useState } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const renderSquare = (index) => {
        return (
            <button
                className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white border border-gray-400 text-4xl font-bold text-black flex justify-center items-center
                ${winner ? 'cursor-not-allowed' : 'hover:bg-gray-100'}
                transition duration-300 ease-in-out
                rounded-lg shadow-md hover:shadow-xl focus:outline-none`}
                onClick={() => handleClick(index)}
                disabled={board[index] || winner}
            >
                {board[index]}
            </button>
        );
    };

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const calculatedWinner = calculateWinner(newBoard);
        if (calculatedWinner) {
            setWinner(calculatedWinner);
        }
    };

    const calculateWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white ">
            <h1 className="text-4xl font-bold mb-8 ">Tic Tac Toe</h1>
            <div className="text-2xl mb-4 p-4 bg-white text-black rounded-lg shadow-lg">
                {winner ? <p>{`Winner: ${winner}`}</p> : <p>{`Next player: ${isXNext ? 'X' : 'O'}`}</p>}
            </div>
            <div className="grid grid-cols-3 gap-4">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            {winner && (
                <button
                    className="mt-8 px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 shadow-lg transition duration-300 ease-in-out"
                    onClick={() => {
                        setBoard(Array(9).fill(null));
                        setWinner(null);
                        setIsXNext(true);
                    }}
                >
                    Play Again
                </button>
            )}
        </div>
    );
};

export default TicTacToe;
