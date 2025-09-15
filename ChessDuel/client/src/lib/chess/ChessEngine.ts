import { Board, ChessPiece, Position, Move, PieceColor, PieceType, GameStatus } from './ChessTypes';

export class ChessEngine {
  static createInitialBoard(): Board {
    const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Place pawns
    for (let col = 0; col < 8; col++) {
      board[1][col] = { type: 'pawn', color: 'black' };
      board[6][col] = { type: 'pawn', color: 'white' };
    }
    
    // Place other pieces
    const backRowPieces: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    
    for (let col = 0; col < 8; col++) {
      board[0][col] = { type: backRowPieces[col], color: 'black' };
      board[7][col] = { type: backRowPieces[col], color: 'white' };
    }
    
    return board;
  }

  static isValidPosition(pos: Position): boolean {
    return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
  }

  static getPossibleMoves(board: Board, from: Position, enPassantTarget: Position | null): Position[] {
    const piece = board[from.row][from.col];
    if (!piece) return [];

    switch (piece.type) {
      case 'pawn':
        return this.getPawnMoves(board, from, enPassantTarget);
      case 'rook':
        return this.getRookMoves(board, from);
      case 'knight':
        return this.getKnightMoves(board, from);
      case 'bishop':
        return this.getBishopMoves(board, from);
      case 'queen':
        return this.getQueenMoves(board, from);
      case 'king':
        return this.getKingMoves(board, from);
      default:
        return [];
    }
  }

  static getPawnMoves(board: Board, from: Position, enPassantTarget: Position | null): Position[] {
    const piece = board[from.row][from.col]!;
    const moves: Position[] = [];
    const direction = piece.color === 'white' ? -1 : 1;
    const startRow = piece.color === 'white' ? 6 : 1;

    // Forward move
    const oneStep = { row: from.row + direction, col: from.col };
    if (this.isValidPosition(oneStep) && !board[oneStep.row][oneStep.col]) {
      moves.push(oneStep);

      // Two steps from starting position
      if (from.row === startRow) {
        const twoSteps = { row: from.row + 2 * direction, col: from.col };
        if (this.isValidPosition(twoSteps) && !board[twoSteps.row][twoSteps.col]) {
          moves.push(twoSteps);
        }
      }
    }

    // Diagonal captures
    for (const colOffset of [-1, 1]) {
      const capturePos = { row: from.row + direction, col: from.col + colOffset };
      if (this.isValidPosition(capturePos)) {
        const targetPiece = board[capturePos.row][capturePos.col];
        if (targetPiece && targetPiece.color !== piece.color) {
          moves.push(capturePos);
        }
        
        // En passant
        if (enPassantTarget && 
            capturePos.row === enPassantTarget.row && 
            capturePos.col === enPassantTarget.col) {
          moves.push(capturePos);
        }
      }
    }

    return moves;
  }

  static getRookMoves(board: Board, from: Position): Position[] {
    return this.getSlidingMoves(board, from, [
      { row: 0, col: 1 }, { row: 0, col: -1 },
      { row: 1, col: 0 }, { row: -1, col: 0 }
    ]);
  }

  static getBishopMoves(board: Board, from: Position): Position[] {
    return this.getSlidingMoves(board, from, [
      { row: 1, col: 1 }, { row: 1, col: -1 },
      { row: -1, col: 1 }, { row: -1, col: -1 }
    ]);
  }

  static getQueenMoves(board: Board, from: Position): Position[] {
    return this.getSlidingMoves(board, from, [
      { row: 0, col: 1 }, { row: 0, col: -1 },
      { row: 1, col: 0 }, { row: -1, col: 0 },
      { row: 1, col: 1 }, { row: 1, col: -1 },
      { row: -1, col: 1 }, { row: -1, col: -1 }
    ]);
  }

  static getSlidingMoves(board: Board, from: Position, directions: Position[]): Position[] {
    const piece = board[from.row][from.col]!;
    const moves: Position[] = [];

    for (const dir of directions) {
      for (let i = 1; i < 8; i++) {
        const newPos = { 
          row: from.row + dir.row * i, 
          col: from.col + dir.col * i 
        };

        if (!this.isValidPosition(newPos)) break;

        const targetPiece = board[newPos.row][newPos.col];
        if (!targetPiece) {
          moves.push(newPos);
        } else {
          if (targetPiece.color !== piece.color) {
            moves.push(newPos);
          }
          break;
        }
      }
    }

    return moves;
  }

  static getKnightMoves(board: Board, from: Position): Position[] {
    const piece = board[from.row][from.col]!;
    const moves: Position[] = [];
    const knightMoves = [
      { row: -2, col: -1 }, { row: -2, col: 1 },
      { row: -1, col: -2 }, { row: -1, col: 2 },
      { row: 1, col: -2 }, { row: 1, col: 2 },
      { row: 2, col: -1 }, { row: 2, col: 1 }
    ];

    for (const move of knightMoves) {
      const newPos = { row: from.row + move.row, col: from.col + move.col };
      if (this.isValidPosition(newPos)) {
        const targetPiece = board[newPos.row][newPos.col];
        if (!targetPiece || targetPiece.color !== piece.color) {
          moves.push(newPos);
        }
      }
    }

    return moves;
  }

  static getKingMoves(board: Board, from: Position): Position[] {
    const piece = board[from.row][from.col]!;
    const moves: Position[] = [];
    const kingMoves = [
      { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
      { row: 0, col: -1 }, { row: 0, col: 1 },
      { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
    ];

    for (const move of kingMoves) {
      const newPos = { row: from.row + move.row, col: from.col + move.col };
      if (this.isValidPosition(newPos)) {
        const targetPiece = board[newPos.row][newPos.col];
        if (!targetPiece || targetPiece.color !== piece.color) {
          moves.push(newPos);
        }
      }
    }

    return moves;
  }

  static isSquareAttacked(board: Board, position: Position, byColor: PieceColor): boolean {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === byColor) {
          const moves = this.getPossibleMoves(board, { row, col }, null);
          if (moves.some(move => move.row === position.row && move.col === position.col)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  static isInCheck(board: Board, kingColor: PieceColor): boolean {
    const kingPos = this.findKing(board, kingColor);
    if (!kingPos) return false;
    
    const enemyColor = kingColor === 'white' ? 'black' : 'white';
    return this.isSquareAttacked(board, kingPos, enemyColor);
  }

  static findKing(board: Board, color: PieceColor): Position | null {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.type === 'king' && piece.color === color) {
          return { row, col };
        }
      }
    }
    return null;
  }

  static makeMove(board: Board, move: Move): Board {
    const newBoard = board.map(row => [...row]);
    
    // Handle en passant capture
    if (move.isEnPassant) {
      const captureRow = move.piece.color === 'white' ? move.to.row + 1 : move.to.row - 1;
      newBoard[captureRow][move.to.col] = null;
    }
    
    // Handle castling
    if (move.isCastle) {
      const row = move.from.row;
      const isKingSide = move.to.col > move.from.col;
      const rookFromCol = isKingSide ? 7 : 0;
      const rookToCol = isKingSide ? 5 : 3;
      
      // Move rook
      newBoard[row][rookToCol] = newBoard[row][rookFromCol];
      newBoard[row][rookFromCol] = null;
      if (newBoard[row][rookToCol]) {
        newBoard[row][rookToCol]!.hasMoved = true;
      }
    }
    
    // Move piece
    newBoard[move.to.row][move.to.col] = { ...move.piece };
    newBoard[move.from.row][move.from.col] = null;
    
    // Mark piece as moved
    if (newBoard[move.to.row][move.to.col]) {
      newBoard[move.to.row][move.to.col]!.hasMoved = true;
    }
    
    // Handle pawn promotion
    if (move.isPromotion && move.promotedTo) {
      newBoard[move.to.row][move.to.col]!.type = move.promotedTo;
    }
    
    return newBoard;
  }

  static isValidMove(board: Board, from: Position, to: Position, enPassantTarget: Position | null): boolean {
    const possibleMoves = this.getPossibleMoves(board, from, enPassantTarget);
    return possibleMoves.some(move => move.row === to.row && move.col === to.col);
  }

  static getGameStatus(board: Board, currentPlayer: PieceColor, enPassantTarget: Position | null): GameStatus {
    const isInCheck = this.isInCheck(board, currentPlayer);
    const hasValidMoves = this.hasValidMoves(board, currentPlayer, enPassantTarget);
    
    if (isInCheck && !hasValidMoves) {
      return 'checkmate';
    } else if (!hasValidMoves) {
      return 'stalemate';
    } else if (isInCheck) {
      return 'check';
    } else {
      return 'playing';
    }
  }

  static hasValidMoves(board: Board, color: PieceColor, enPassantTarget: Position | null): boolean {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === color) {
          const moves = this.getPossibleMoves(board, { row, col }, enPassantTarget);
          for (const move of moves) {
            if (this.isLegalMove(board, { row, col }, move, enPassantTarget)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  static isLegalMove(board: Board, from: Position, to: Position, enPassantTarget: Position | null): boolean {
    const piece = board[from.row][from.col];
    if (!piece) return false;

    // Create temporary move
    const tempMove: Move = {
      from,
      to,
      piece,
      capturedPiece: board[to.row][to.col] || undefined,
      isEnPassant: piece.type === 'pawn' && enPassantTarget && 
                   to.row === enPassantTarget.row && to.col === enPassantTarget.col
    };

    // Make the move on a copy of the board
    const tempBoard = this.makeMove(board, tempMove);
    
    // Check if the move leaves the king in check
    return !this.isInCheck(tempBoard, piece.color);
  }
}
