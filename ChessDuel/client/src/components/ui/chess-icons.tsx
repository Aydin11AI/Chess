import { PieceType, PieceColor } from "@/lib/chess/ChessTypes";

interface ChessIconProps {
  type: PieceType;
  color: PieceColor;
  size?: number;
}

export function ChessIcon({ type, color, size = 40 }: ChessIconProps) {
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

  return (
    <span 
      className={`select-none ${color === 'white' ? 'text-white' : 'text-black'}`}
      style={{ 
        fontSize: `${size}px`,
        textShadow: color === 'white' 
          ? '1px 1px 2px rgba(0,0,0,0.8)' 
          : '1px 1px 2px rgba(255,255,255,0.5)',
        lineHeight: 1
      }}
    >
      {pieces[color][type]}
    </span>
  );
}
