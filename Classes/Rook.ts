import { Color, Type } from '../interfaces';
import ChessPiece from './ChessPiece';

class Rook extends ChessPiece {
  type: Type;

  constructor(color: Color, position: string) {
    super(color, position);
    this.type = 'R'; // R for Rook
  }

  getAvailableMoves(board: { [key: string]: ChessPiece }): string[] {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const currentFileIndex = files.indexOf(this.position[0]);
    const currentRank = parseInt(this.position[1]);

    const availableMoves: string[] = [];

    // Horizontal and Vertical Moves
    const directions = [
      { fileChange: 1, rankChange: 0 },   // Move right (same rank)
      { fileChange: -1, rankChange: 0 },  // Move left (same rank)
      { fileChange: 0, rankChange: 1 },   // Move up (same file)
      { fileChange: 0, rankChange: -1 },  // Move down (same file)
    ];

    // Check each direction
    for (const { fileChange, rankChange } of directions) {
      let targetFileIndex = currentFileIndex;
      let targetRank = currentRank;

      // Move in the given direction until we hit the edge of the board or a piece
      while (true) {
        targetFileIndex += fileChange;
        targetRank += rankChange;

        // Ensure the move is within bounds
        if (targetFileIndex < 0 || targetFileIndex >= 8 || targetRank < 1 || targetRank > 8) break;

        const targetPosition = `${files[targetFileIndex]}${targetRank}`;
        const targetPiece = board[targetPosition];

        // If the square is empty or has an enemy piece, it's a valid move
        if (!targetPiece || this.isEnemyPiece(targetPiece)) {
          availableMoves.push(targetPosition);

          // If there's an enemy piece, we can stop (since rooks can't jump over pieces)
          if (targetPiece) {
            break;
          }
        } else {
          // If there's a friendly piece, stop in this direction
          break;
        }
      }
    }

    return availableMoves;
  }
}

export default Rook;