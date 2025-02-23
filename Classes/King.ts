import { Color, Type } from '../interfaces';
import ChessPiece from './ChessPiece';

class King extends ChessPiece {
  type: Type;

  constructor(color: Color, position: string) {
    super(color, position);
    this.type = 'K'; // K for King
  }

  getAvailableMoves(board: { [key: string]: ChessPiece }): string[] {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const currentFileIndex = files.indexOf(this.position[0]);
    const currentRank = parseInt(this.position[1]);

    const availableMoves: string[] = [];

    // Possible King moves (one square in any direction)
    const directions = [
      { fileChange: 1, rankChange: 0 },   // Move right
      { fileChange: -1, rankChange: 0 },  // Move left
      { fileChange: 0, rankChange: 1 },   // Move up
      { fileChange: 0, rankChange: -1 },  // Move down
      { fileChange: 1, rankChange: 1 },   // Move top-right (diagonal)
      { fileChange: -1, rankChange: 1 },  // Move top-left (diagonal)
      { fileChange: 1, rankChange: -1 },  // Move bottom-right (diagonal)
      { fileChange: -1, rankChange: -1 }, // Move bottom-left (diagonal)
    ];

    // Check each direction
    for (const { fileChange, rankChange } of directions) {
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

export default King;