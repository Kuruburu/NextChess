import { Color, Type } from "../interfaces";

abstract class ChessPiece {

  color: Color
  position: string
  abstract type: Type
  constructor(color: Color, position: string) {
    if (new.target === ChessPiece) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
    this.color = color; // 'white' or 'black'
    this.position = position; // Position like 'a1', 'd4', etc.
  }

  // Abstract method for calculating available moves
  abstract getAvailableMoves(board: { [key: string]: ChessPiece | null }): string[];

  move(board: { [key: string]: ChessPiece | null}, newPosition: string): { [key: string]: ChessPiece | null} {
    // Get the available moves
    const availableMoves = this.getAvailableMoves(board);
    
    // Check if the move is valid
    if (availableMoves.includes(newPosition)) {
      // Move is valid: update the position
      const updatedBoard = {...board}
      updatedBoard[this.position] = null;
      this.position = newPosition;
      updatedBoard[newPosition] = this;
      return updatedBoard;
    }
    
    // If the move is not valid, return false
    return board;
  }
  // Utility to check if the target piece belongs to the opponent
  isEnemyPiece(targetPiece: ChessPiece): boolean {
    if (!targetPiece) return false;
    return targetPiece.color !== this.color;
  }
}

export default ChessPiece;