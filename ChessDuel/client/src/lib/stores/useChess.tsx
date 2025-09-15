import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { GameState, Position, Move, PieceColor, PieceType, Board } from "../chess/ChessTypes";
import { ChessEngine } from "../chess/ChessEngine";

interface ChessStore extends GameState {
  // Actions
  selectSquare: (position: Position) => void;
  makeMove: (from: Position, to: Position, promotedTo?: PieceType) => void;
  resetGame: () => void;
  isSquareSelected: (position: Position) => boolean;
  isValidMoveTarget: (position: Position) => boolean;
  isLastMoveSquare: (position: Position) => boolean;
  getCurrentPlayerColor: () => PieceColor;
  canCastle: (kingside: boolean) => boolean;
}

const createInitialState = (): GameState => ({
  board: ChessEngine.createInitialBoard(),
  currentPlayer: 'white',
  status: 'playing',
  moves: [],
  selectedSquare: null,
  validMoves: [],
  lastMove: null,
  enPassantTarget: null,
  kingPositions: {
    white: { row: 7, col: 4 },
    black: { row: 0, col: 4 }
  }
});

export const useChess = create<ChessStore>()(
  subscribeWithSelector((set, get) => ({
    ...createInitialState(),

    selectSquare: (position: Position) => {
      const state = get();
      const piece = state.board[position.row][position.col];

      // If clicking on empty square or opponent piece while having a selection
      if (state.selectedSquare && (!piece || piece.color !== state.currentPlayer)) {
        // Try to make a move
        const isValidMove = state.validMoves.some(
          move => move.row === position.row && move.col === position.col
        );

        if (isValidMove) {
          get().makeMove(state.selectedSquare, position);
          return;
        }
      }

      // Select new square if it has a piece of current player's color
      if (piece && piece.color === state.currentPlayer) {
        const validMoves = ChessEngine.getPossibleMoves(state.board, position, state.enPassantTarget)
          .filter(move => ChessEngine.isLegalMove(state.board, position, move, state.enPassantTarget));

        set({
          selectedSquare: position,
          validMoves
        });
      } else {
        // Deselect
        set({
          selectedSquare: null,
          validMoves: []
        });
      }
    },

    makeMove: (from: Position, to: Position, promotedTo?: PieceType) => {
      const state = get();
      const piece = state.board[from.row][from.col];
      
      if (!piece || piece.color !== state.currentPlayer) return;
      
      // Validate move
      if (!ChessEngine.isValidMove(state.board, from, to, state.enPassantTarget) ||
          !ChessEngine.isLegalMove(state.board, from, to, state.enPassantTarget)) {
        return;
      }

      const capturedPiece = state.board[to.row][to.col];
      
      // Check for special moves
      const isPromotion = piece.type === 'pawn' && 
        ((piece.color === 'white' && to.row === 0) || 
         (piece.color === 'black' && to.row === 7));
        
      const isEnPassant = piece.type === 'pawn' && 
        state.enPassantTarget && 
        to.row === state.enPassantTarget.row && 
        to.col === state.enPassantTarget.col;
        
      const isCastle = piece.type === 'king' && 
        Math.abs(to.col - from.col) === 2;

      // Create move object
      const move: Move = {
        from,
        to,
        piece,
        capturedPiece: capturedPiece || undefined,
        isPromotion,
        promotedTo: promotedTo || (isPromotion ? 'queen' : undefined),
        isCastle,
        isEnPassant
      };

      // Make the move
      const newBoard = ChessEngine.makeMove(state.board, move);
      
      // Update king positions
      const newKingPositions = { ...state.kingPositions };
      if (piece.type === 'king') {
        newKingPositions[piece.color] = to;
      }

      // Calculate en passant target for next turn
      let newEnPassantTarget: Position | null = null;
      if (piece.type === 'pawn' && Math.abs(to.row - from.row) === 2) {
        newEnPassantTarget = {
          row: piece.color === 'white' ? to.row + 1 : to.row - 1,
          col: to.col
        };
      }

      const nextPlayer: PieceColor = state.currentPlayer === 'white' ? 'black' : 'white';
      const newStatus = ChessEngine.getGameStatus(newBoard, nextPlayer, newEnPassantTarget);

      set({
        board: newBoard,
        currentPlayer: nextPlayer,
        status: newStatus,
        moves: [...state.moves, move],
        selectedSquare: null,
        validMoves: [],
        lastMove: move,
        enPassantTarget: newEnPassantTarget,
        kingPositions: newKingPositions
      });
    },

    resetGame: () => {
      set(createInitialState());
    },

    isSquareSelected: (position: Position) => {
      const state = get();
      return state.selectedSquare !== null &&
        state.selectedSquare.row === position.row &&
        state.selectedSquare.col === position.col;
    },

    isValidMoveTarget: (position: Position) => {
      const state = get();
      return state.validMoves.some(
        move => move.row === position.row && move.col === position.col
      );
    },

    isLastMoveSquare: (position: Position) => {
      const state = get();
      if (!state.lastMove) return false;
      
      return (state.lastMove.from.row === position.row && state.lastMove.from.col === position.col) ||
             (state.lastMove.to.row === position.row && state.lastMove.to.col === position.col);
    },

    getCurrentPlayerColor: () => {
      return get().currentPlayer;
    },

    canCastle: (kingside: boolean) => {
      const state = get();
      const king = state.board[state.kingPositions[state.currentPlayer].row][state.kingPositions[state.currentPlayer].col];
      
      if (!king || king.hasMoved || ChessEngine.isInCheck(state.board, state.currentPlayer)) {
        return false;
      }

      const row = state.currentPlayer === 'white' ? 7 : 0;
      const rookCol = kingside ? 7 : 0;
      const rook = state.board[row][rookCol];

      if (!rook || rook.type !== 'rook' || rook.hasMoved) {
        return false;
      }

      // Check if squares between king and rook are empty
      const startCol = Math.min(4, rookCol) + 1;
      const endCol = Math.max(4, rookCol);
      
      for (let col = startCol; col < endCol; col++) {
        if (state.board[row][col] !== null) {
          return false;
        }
      }

      return true;
    }
  }))
);
