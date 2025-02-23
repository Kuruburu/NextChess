import { Color, Type } from "../interfaces";
import ChessPiece from "./ChessPiece";

class Bishop extends ChessPiece {
  type: Type;
  constructor(color: Color, position: string) {
    super(color, position);
    this.type = 'B'; // Bishop type
  }
  
  // Get available moves for the Bishop
  getAvailableMoves(board: { [key: string]: ChessPiece}): string[] {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const directions = [
      { fileChange: 1, rankChange: 1 },   // Up-right
      { fileChange: 1, rankChange: -1 },  // Down-right
      { fileChange: -1, rankChange: 1 },  // Up-left
      { fileChange: -1, rankChange: -1 }, // Down-left
    ];

    const availableMoves = [];
    const currentFileIndex = files.indexOf(this.position[0]);
    const currentRank = parseInt(this.position[1]);

    for (const { fileChange, rankChange } of directions) {
      let fileIndex = currentFileIndex + fileChange;
      let rank = currentRank + rankChange;

      while (fileIndex >= 0 && fileIndex < 8 && rank >= 1 && rank <= 8) {
        const targetPosition = `${files[fileIndex]}${rank}`;
        const targetPiece = board[targetPosition];

        if (targetPiece) {
          // If there's a piece, check color for capture and break
          if (this.isEnemyPiece(targetPiece)) {
            availableMoves.push(targetPosition); // Add capture move
          }
          break; // Stop further movement in this direction
        }

        // If the square is empty, add it to available moves
        availableMoves.push(targetPosition);

        // Move further in the same direction
        fileIndex += fileChange;
        rank += rankChange;
      }
    }

    return availableMoves;
  }

}

export default Bishop;