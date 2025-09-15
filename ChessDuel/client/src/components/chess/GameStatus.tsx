import { useChess } from "@/lib/stores/useChess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Trophy, Users, RotateCcw } from "lucide-react";

interface GameStatusProps {
  onReturnToLobby: () => void;
}

export function GameStatus({ onReturnToLobby }: GameStatusProps) {
  const { status, currentPlayer, resetGame } = useChess();

  const getWinner = () => {
    if (status === 'checkmate') {
      return currentPlayer === 'white' ? 'black' : 'white';
    }
    return null;
  };

  const getLoser = () => {
    if (status === 'checkmate') {
      return currentPlayer;
    }
    return null;
  };

  const isGameOver = status === 'checkmate' || status === 'stalemate' || status === 'draw';
  const winner = getWinner();
  const loser = getLoser();

  if (status === 'checkmate') {
    return (
      <Card className="w-full bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-400">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <CardTitle className="text-2xl font-bold text-yellow-800">GAME OVER!</CardTitle>
            <Trophy className="h-8 w-8 text-yellow-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Winner Display */}
          <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Crown className="h-8 w-8 text-green-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800 uppercase">
                  {winner} WINS!
                </div>
                <div className="text-lg text-green-700 font-semibold">
                  🎉 VICTORY! 🎉
                </div>
              </div>
              <Crown className="h-8 w-8 text-green-600" />
            </div>
          </div>

          {/* Loser Display */}
          <div className="bg-red-100 border-2 border-red-400 rounded-lg p-3">
            <div className="text-center">
              <div className="text-xl font-bold text-red-800 uppercase">
                {loser} LOSES
              </div>
              <div className="text-sm text-red-600">
                Checkmate - Better luck next time!
              </div>
            </div>
          </div>

          {/* Game Actions */}
          <div className="flex gap-2 justify-center pt-2">
            <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700 text-white">
              <RotateCcw className="mr-2 h-4 w-4" />
              New Game
            </Button>
            <Button onClick={onReturnToLobby} variant="outline" className="border-gray-400">
              <Users className="mr-2 h-4 w-4" />
              Return to Lobby
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === 'stalemate' || status === 'draw') {
    return (
      <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-blue-800">GAME OVER - DRAW!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-blue-800 mb-2">
              🤝 IT'S A TIE! 🤝
            </div>
            <div className="text-blue-700">
              {status === 'stalemate' ? 'Stalemate - No legal moves available' : 'Draw declared'}
            </div>
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700 text-white">
              <RotateCcw className="mr-2 h-4 w-4" />
              New Game
            </Button>
            <Button onClick={onReturnToLobby} variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Return to Lobby
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Regular game status (playing or check)
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Game Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          {status === 'check' ? (
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3">
              <div className="text-xl font-bold text-yellow-800 mb-1">
                ⚠️ CHECK! ⚠️
              </div>
              <div className="text-yellow-700">
                {currentPlayer === 'white' ? 'White' : 'Black'} is in check!
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-3">
              <div className="text-lg font-semibold text-gray-800">
                {currentPlayer === 'white' ? 'White' : 'Black'}'s Turn
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 justify-center">
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Game
          </Button>
          <Button onClick={onReturnToLobby} variant="default">
            <Users className="mr-2 h-4 w-4" />
            Return to Lobby
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
