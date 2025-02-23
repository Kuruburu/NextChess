import { Color, Type } from '../interfaces';
import ChessPiece from './ChessPiece';

class Knight extends ChessPiece {
  type: Type;

  constructor(color: Color, position: string) {
    super(color, position);
    this.type = 'N'; // N for Knight
  }

  getAvailableMoves(board: { [key: string]: ChessPiece }): string[] {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const currentFileIndex = files.indexOf(this.position[0]);
    const currentRank = parseInt(this.position[1]);

    // Possible moves for a Knight (2 squares in one direction + 1 square in a perpendicular direction)
    const knightMoves = [
      { fileChange: 2, rankChange: 1 },   // Move 2 squares right, 1 square up
      { fileChange: 2, rankChange: -1 },  // Move 2 squares right, 1 square down
      { fileChange: -2, rankChange: 1 },  // Move 2 squares left, 1 square up
      { fileChange: -2, rankChange: -1 }, // Move 2 squares left, 1 square down
      { fileChange: 1, rankChange: 2 },   // Move 1 square right, 2 squares up
      { fileChange: 1, rankChange: -2 },  // Move 1 square right, 2 squares down
      { fileChange: -1, rankChange: 2 },  // Move 1 square left, 2 squares up
      { fileChange: -1, rankChange: -2 }, // Move 1 square left, 2 squares down
    ];

    const availableMoves: string[] = [];

    // Check each possible move
    for (const { fileChange, rankChange } of knightMoves) {
      const targetFileIndex = currentFileIndex + fileChange;
      const targetRank = currentRank + rankChange;

      // Ensure the move is within bounds
      if (targetFileIndex >= 0 && targetFileIndex < 8 && targetRank >= 1 && targetRank <= 8) {
        const targetPosition = `${files[targetFileIndex]}${targetRank}`;
        const targetPiece = board[targetPosition];

        // If the square is empty or has an enemy piece, it's a valid move
        if (!targetPiece || this.isEnemyPiece(targetPiece)) {
          availableMoves.push(targetPosition);
        }
      }
    }

    return availableMoves;
  }
}

export default Knight;