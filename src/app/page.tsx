'use client'
import Queen from "../../Classes/Queen";
import { useEffect, useState } from "react";
import Pawn from "../../Classes/Pawn";
import Rook from "../../Classes/Rook";
import ChessPiece from "../../Classes/ChessPiece";
import Bishop from "../../Classes/Bishop";
import King from "../../Classes/King";
import Knight from "../../Classes/Knight";
import { Color } from "../../interfaces";


const createChessboardObject = () => {
  const board: { [key: string]: ChessPiece | null } = {};
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const firstRankWhite = [
    new Rook("white", "a1"),
    new Knight("white", "b1"),
    new Bishop("white", "c1"),
    new Queen("white", "d1"),
    new King("white", "e1"),
    new Bishop("white", "f1"),
    new Knight("white", "g1"),
    new Rook("white", "h1")
  ];
  const firstRankBlack = [
    new Rook("black", "a8"),
    new Knight("black", "b8"),
    new Bishop("black", "c8"),
    new Queen("black", "d8"),
    new King("black", "e8"),
    new Bishop("black", "f8"),
    new Knight("black", "g8"),
    new Rook("black", "h8")
  ];

  const secondRankWhite = files.map((file, index) => new Pawn("white", `${file}2`));
  const secondRankBlack = files.map((file, index) => new Pawn("black", `${file}7`));

  for (let rank = 1; rank <= 8; rank++) {
    for (let file = 0; file < files.length; file++) {
      const position = `${files[file]}${rank}`;

      if (rank === 1) {
        board[position] = firstRankWhite[file];
      } else if (rank === 2) {
        board[position] = secondRankWhite[file];
      } else if (rank === 7) {
        board[position] = secondRankBlack[file];
      } else if (rank === 8) {
        board[position] = firstRankBlack[file];
      } else {
        board[position] = null; 
      }
    }
  }

  return board;
};



export default function Home() {
  const chessboard = createChessboardObject();
  console.log(chessboard);
  
  const [currentChessBoard, setCurrentChessBoard] = useState(chessboard);
  const [highlightedMoves, setHighlightedMoves] = useState<string[]>([]);
  const [currentPiece, setCurrentPiece] = useState<ChessPiece | null>(); // Track the selected piece
  const [currentTurn, setCurrentTurn] = useState<Color>("white");
  const [whoWon, setWhoWon] = useState<Color | null>(null);

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  const handleRestart = () => {
    setHighlightedMoves([]);
    setWhoWon(null);
    setCurrentPiece(null);
    setCurrentChessBoard(createChessboardObject())
    setCurrentTurn("white");
  }

  const handleClickPiece = (piece: ChessPiece) => {
    const availableMoves = piece.getAvailableMoves(currentChessBoard);
    setCurrentPiece(piece);
    setHighlightedMoves(availableMoves);
  };

  const handleMovePiece = (newPosition: string) => {
    if (!currentPiece) return; // No piece selected
    const newBoard = currentPiece.move(currentChessBoard, newPosition); // Try to move the piece
    setHighlightedMoves([]); // Clear highlighted moves
    setCurrentPiece(null); // Deselect piece
    setCurrentChessBoard(newBoard);
    setCurrentTurn(currentTurn === "white" ? "black" : "white");
  };

  const renderChessPiece = (piece: ChessPiece, currentTurn: Color) => {
    return (
      piece.color === "white" ? 
        <button
          disabled={currentTurn === "white" ? false : true}
          onClick={() => handleClickPiece(piece)}
          className={`font-semibold text-3xl text-red-600 ${currentTurn === "white" && "hover:cursor-pointer"}`}
        >
          {piece.type}
        </button>
      : 
        <button
          disabled={currentTurn === "black" ? false : true}
          onClick={() => handleClickPiece(piece)}
          className={`font-semibold text-3xl text-black ${currentTurn === "black" && "hover:cursor-pointer"}`}
        >
          {piece.type}
        </button>
    )
  }

  const decideWhoWon = (currentChessBoard: {[key: string]: ChessPiece | null}) => {
    const currentPieces = Object.values(currentChessBoard).filter((tile) => tile != null)
    console.log(currentPieces);
    const kings = currentPieces.filter((piece: ChessPiece) => piece.type === "K")
    console.log("kings", kings);
    
    if (kings.length === 2){
      return
    }
    if (kings[0].color === "white"){
      setWhoWon("white");
      return
    } else {
      setWhoWon("black")
      return
    };
  }
  useEffect(() => {
    decideWhoWon(currentChessBoard);
  }, [currentChessBoard])
  

  return (
    <div aria-disabled={whoWon !== "white" || "black" ? false : true} className="flex flex-col gap-32 h-screen justify-center items-center">
      {whoWon ? 
      <div>
        <h1>{whoWon} Won</h1>
        <button onClick={handleRestart}>Restart</button>
      </div> : <h1>Now moves {currentTurn}</h1>} 
      <div key={1} className="grid grid-cols-8 border border-gray-400">
        {ranks.map((rank) =>
          files.map((file, fileIndex) => {
            const position = `${file}${rank}`;
            const isWhiteSquare = (rank + fileIndex) % 2 === 0;
            const squareColor = isWhiteSquare ? "bg-yellow-600" : "bg-yellow-900";
            const piece: ChessPiece | null = currentChessBoard[position];

            // Check if the current square is in the highlighted moves
            const isHighlighted = highlightedMoves.includes(position);

            return (
              <div key={position} className={`${squareColor} flex items-center justify-center h-16 w-16 opacity-90 relative`}>
                {isHighlighted && (
                  <div onClick={() => handleMovePiece(position)} className="absolute inset-0 bg-green-500 opacity-50 cursor-pointer"></div>
                )}
                {piece && renderChessPiece(piece, currentTurn)}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
