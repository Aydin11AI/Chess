import { ChessBoard } from "@/components/chess/ChessBoard";
import { GameStatus } from "@/components/chess/GameStatus";
import { MoveHistory } from "@/components/chess/MoveHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChessGameProps {
  gameId: string;
  onReturnToLobby: () => void;
}

export default function ChessGame({ gameId, onReturnToLobby }: ChessGameProps) {
  const getGameTypeLabel = () => {
    if (gameId.startsWith('QUICK-')) {
      return { label: 'Quick Match', color: 'bg-green-500' };
    } else if (gameId.startsWith('ROOM-')) {
      return { label: 'Private Room', color: 'bg-purple-500' };
    } else if (gameId.startsWith('JOIN-')) {
      return { label: 'Joined Room', color: 'bg-blue-500' };
    }
    return { label: 'Game', color: 'bg-gray-500' };
  };

  const gameType = getGameTypeLabel();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white">Chess Game</h1>
            <Badge className={`${gameType.color} text-white`}>
              {gameType.label}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-300">Game ID</div>
            <div className="text-lg font-mono text-white">{gameId}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chess Board - Main area */}
          <div className="lg:col-span-2 flex justify-center">
            <ChessBoard />
          </div>

          {/* Sidebar with game info */}
          <div className="space-y-6">
            <GameStatus onReturnToLobby={onReturnToLobby} />
            <MoveHistory />
            
            {/* Game Info */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">Game Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Game Type:</span>
                  <span className="text-white">{gameType.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Game ID:</span>
                  <span className="text-white font-mono">{gameId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Players:</span>
                  <span className="text-white">2/2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-green-400">Connected</span>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">How to Play</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-300 space-y-2">
                <p>• Click on a piece to select it</p>
                <p>• Click on a highlighted square to move</p>
                <p>• Valid moves are shown in green</p>
                <p>• Selected piece is highlighted in blue</p>
                <p>• Last move is highlighted in yellow</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
