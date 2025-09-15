import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChessUtils } from "@/lib/chess/ChessUtils";
import { Users, Zap, Crown, Plus } from "lucide-react";

interface GameLobbyProps {
  onStartGame: (gameId: string) => void;
}

export default function GameLobby({ onStartGame }: GameLobbyProps) {
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleQuickMatch = () => {
    const gameId = ChessUtils.generateGameId();
    onStartGame(`QUICK-${gameId}`);
  };

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      alert("Please enter your name");
      return;
    }
    setIsCreatingRoom(true);
    setTimeout(() => {
      const gameId = ChessUtils.generateGameId();
      onStartGame(`ROOM-${gameId}`);
    }, 1000);
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) {
      alert("Please enter a room code");
      return;
    }
    if (!playerName.trim()) {
      alert("Please enter your name");
      return;
    }
    onStartGame(`JOIN-${roomCode}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <Crown className="h-16 w-16" />
            Chess Master
          </h1>
          <p className="text-xl text-gray-300">
            Play chess online with friends or find a quick match
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Match */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Zap className="h-6 w-6" />
                Quick Match
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-center">
                Find an opponent instantly and start playing right away
              </p>
              <Button 
                onClick={handleQuickMatch}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3"
                size="lg"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Quick Match
              </Button>
              <div className="text-center text-sm text-gray-400">
                • Instant matchmaking
                <br />
                • Random opponent
                <br />
                • No room codes needed
              </div>
            </CardContent>
          </Card>

          {/* Private Rooms */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Users className="h-6 w-6" />
                Private Rooms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="playerName" className="text-white">
                  Your Name
                </Label>
                <Input
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                />
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-3">
                <Button 
                  onClick={handleCreateRoom}
                  disabled={isCreatingRoom}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                >
                  {isCreatingRoom ? (
                    "Creating Room..."
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Private Room
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-400">or</div>

                <div className="space-y-2">
                  <Input
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    placeholder="Enter room code"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                  />
                  <Button 
                    onClick={handleJoinRoom}
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    Join Room
                  </Button>
                </div>
              </div>

              <div className="text-center text-sm text-gray-400">
                • Play with friends
                <br />
                • Share room code
                <br />
                • Private games
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Game Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">Full Chess Rules</h3>
              <p className="text-gray-300 text-sm">
                Complete implementation of chess rules including castling, en passant, and pawn promotion
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">Move Validation</h3>
              <p className="text-gray-300 text-sm">
                Real-time move validation and check/checkmate detection
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">Move History</h3>
              <p className="text-gray-300 text-sm">
                Complete game history with standard chess notation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
