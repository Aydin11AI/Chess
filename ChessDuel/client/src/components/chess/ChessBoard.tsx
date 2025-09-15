import { useChess } from "@/lib/stores/useChess";
import { ChessPiece } from "./ChessPiece";
import { ChessUtils } from "@/lib/chess/ChessUtils";
import { Position } from "@/lib/chess/ChessTypes";

export function ChessBoard() {
  const {
    board,
    selectSquare,
    isSquareSelected,
    isValidMoveTarget,
    isLastMoveSquare,
    currentPlayer
  } = useChess();

  const handleSquareClick = (row: number, col: number) => {
    selectSquare({ row, col });
  };

  const getSquareClasses = (row: number, col: number) => {
    const position: Position = { row, col };
    const baseColor = ChessUtils.getSquareColor(row, col);
    let classes = `w-16 h-16 flex items-center justify-center relative border border-gray-400 ${baseColor}`;

    if (isSquareSelected(position)) {
      classes += ' ring-4 ring-blue-400 ring-opacity-70';
    } else if (isValidMoveTarget(position)) {
      classes += ' ring-2 ring-green-400 ring-opacity-70';
    } else if (isLastMoveSquare(position)) {
      classes += ' ring-2 ring-yellow-400 ring-opacity-50';
    }

    return classes;
  };

  return (
    <div className="bg-amber-900 p-4 rounded-lg shadow-2xl">
      {/* Column labels */}
      <div className="flex mb-2">
        <div className="w-8"></div>
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => (
          <div key={letter} className="w-16 h-6 flex items-center justify-center text-amber-100 font-bold">
            {letter}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Row labels */}
        <div className="flex flex-col">
          {[8, 7, 6, 5, 4, 3, 2, 1].map(number => (
            <div key={number} className="w-8 h-16 flex items-center justify-center text-amber-100 font-bold">
              {number}
            </div>
          ))}
        </div>

        {/* Chess board */}
        <div className="grid grid-cols-8 border-2 border-amber-700">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getSquareClasses(rowIndex, colIndex)}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {piece && <ChessPiece piece={piece} />}
                {isValidMoveTarget({ row: rowIndex, col: colIndex }) && !piece && (
                  <div className="w-4 h-4 bg-green-400 rounded-full opacity-60"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Turn indicator */}
      <div className="mt-4 text-center">
        <div className="inline-block bg-amber-100 px-4 py-2 rounded-lg shadow">
          <span className="font-bold text-amber-800">
            {currentPlayer === 'white' ? 'White' : 'Black'} to move
          </span>
        </div>
      </div>
    </div>
  );
}
