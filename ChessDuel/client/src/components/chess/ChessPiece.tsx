import { ChessPiece as ChessPieceType } from "@/lib/chess/ChessTypes";
import { ChessIcon } from "@/components/ui/chess-icons";

interface ChessPieceProps {
  piece: ChessPieceType;
  isDragging?: boolean;
  onClick?: () => void;
}

export function ChessPiece({ piece, isDragging = false, onClick }: ChessPieceProps) {
  return (
    <div
      className={`
        flex items-center justify-center w-full h-full cursor-pointer
        transition-transform duration-150 hover:scale-110
        ${isDragging ? 'scale-110 z-50' : ''}
      `}
      onClick={onClick}
    >
      <ChessIcon 
        type={piece.type} 
        color={piece.color} 
        size={isDragging ? 50 : 45} 
      />
    </div>
  );
}
