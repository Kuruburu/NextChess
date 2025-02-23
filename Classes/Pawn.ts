import { Color, Type } from '../interfaces';
import ChessPiece from './ChessPiece';

class Pawn extends ChessPiece {

  type: Type;
  constructor(public color: Color, public position: string) {
    super(color, position);
    this.type = 'P'; // P for Pawn
  }

  getAvailableMoves(board: { [key: string]: ChessPiece }): string[] {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const currentFileIndex = files.indexOf(this.position[0]);
    const currentRank = parseInt(this.position[1]);
    const direction = this.color === 'white' ? 1 : -1; // White moves upwards, Black moves downwards

    const availableMoves: string[] = [];

    // 1. Single step forward (if the square is empty)
    const forwardPosition = `${files[currentFileIndex]}${currentRank + direction}`;
    if (!board[forwardPosition]) {
      availableMoves.push(forwardPosition);
    }

    // 2. Double step forward from the starting position
    if ((this.color === 'white' && currentRank === 2) || (this.color === 'black' && currentRank === 7)) {
      const doubleForwardPosition = `${files[currentFileIndex]}${currentRank + 2 * direction}`;
      if (!board[forwardPosition] && !board[doubleForwardPosition]) {
        availableMoves.push(doubleForwardPosition);
      }
    }

    // 3. Diagonal captures (if an enemy piece is present)
    const diagonalLeft = `${files[currentFileIndex - 1]}${currentRank + direction}`;
    const diagonalRight = `${files[currentFileIndex + 1]}${currentRank + direction}`;

    if (currentFileIndex > 0) {
      const leftPiece = board[diagonalLeft];
      if (leftPiece && this.isEnemyPiece(leftPiece)) {
        availableMoves.push(diagonalLeft);
      }
    }

    if (currentFileIndex < 7) {
      const rightPiece = board[diagonalRight];
      if (rightPiece && this.isEnemyPiece(rightPiece)) {
        availableMoves.push(diagonalRight);
      }
    }

    return availableMoves;
  }
}

export default Pawn;