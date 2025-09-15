import { useChess } from "@/lib/stores/useChess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChessUtils } from "@/lib/chess/ChessUtils";

export function MoveHistory() {
  const { moves } = useChess();

  const formatMove = (moveIndex: number) => {
    const move = moves[moveIndex];
    if (!move) return '';

    let notation = '';
    
    // Add piece notation (except for pawns)
    if (move.piece.type !== 'pawn') {
      notation += move.piece.type.charAt(0).toUpperCase();
    }
    
    // Add capture notation
    if (move.capturedPiece || move.isEnPassant) {
      if (move.piece.type === 'pawn') {
        notation += ChessUtils.positionToAlgebraic(move.from).charAt(0);
      }
      notation += 'x';
    }
    
    // Add destination square
    notation += ChessUtils.positionToAlgebraic(move.to);
    
    // Add special move notation
    if (move.isPromotion && move.promotedTo) {
      notation += '=' + move.promotedTo.charAt(0).toUpperCase();
    }
    
    if (move.isCastle) {
      const isKingSide = move.to.col > move.from.col;
      notation = isKingSide ? 'O-O' : 'O-O-O';
    }
    
    return notation;
  };

  // Group moves by pairs (white, black)
  const movePairs = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: moves[i] ? formatMove(i) : '',
      black: moves[i + 1] ? formatMove(i + 1) : ''
    });
  }

  return (
    <Card className="w-full h-96">
      <CardHeader>
        <CardTitle className="text-center">Move History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          {movePairs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No moves yet
            </div>
          ) : (
            <div className="space-y-1">
              {movePairs.map((pair) => (
                <div key={pair.moveNumber} className="grid grid-cols-3 gap-2 py-1 px-2 hover:bg-gray-50 rounded">
                  <div className="text-sm font-semibold text-gray-600">
                    {pair.moveNumber}.
                  </div>
                  <div className="text-sm font-mono">
                    {pair.white}
                  </div>
                  <div className="text-sm font-mono">
                    {pair.black}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
