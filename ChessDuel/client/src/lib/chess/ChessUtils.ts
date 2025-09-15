import { Position, PieceColor, PieceType } from './ChessTypes';

export class ChessUtils {
  static positionToAlgebraic(pos: Position): string {
    return String.fromCharCode(97 + pos.col) + (8 - pos.row).toString();
  }

  static algebraicToPosition(algebraic: string): Position {
    const col = algebraic.charCodeAt(0) - 97;
    const row = 8 - parseInt(algebraic[1]);
    return { row, col };
  }

  static arePositionsEqual(pos1: Position, pos2: Position): boolean {
    return pos1.row === pos2.row && pos1.col === pos2.col;
  }

  static getPieceUnicode(type: PieceType, color: PieceColor): string {
    const pieces = {
      white: {
        king: '♔',
        queen: '♕',
        rook: '♖',
        bishop: '♗',
        knight: '♘',
        pawn: '♙'
      },
      black: {
        king: '♚',
        queen: '♛',
        rook: '♜',
        bishop: '♝',
        knight: '♞',
        pawn: '♟'
      }
    };
    
    return pieces[color][type];
  }

  static isLightSquare(row: number, col: number): boolean {
    return (row + col) % 2 === 0;
  }

  static getSquareColor(row: number, col: number): string {
    return this.isLightSquare(row, col) ? 'bg-amber-100' : 'bg-amber-800';
  }

  static generateGameId(): string {
    return Math.random().toString(36).substring(2, 9).toUpperCase();
  }
}
