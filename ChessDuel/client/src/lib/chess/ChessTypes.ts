export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type PieceColor = 'white' | 'black';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
  hasMoved?: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
  piece: ChessPiece;
  capturedPiece?: ChessPiece;
  isPromotion?: boolean;
  promotedTo?: PieceType;
  isCastle?: boolean;
  isEnPassant?: boolean;
}

export type Board = (ChessPiece | null)[][];

export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: PieceColor;
  status: GameStatus;
  moves: Move[];
  selectedSquare: Position | null;
  validMoves: Position[];
  lastMove: Move | null;
  enPassantTarget: Position | null;
  kingPositions: {
    white: Position;
    black: Position;
  };
}
