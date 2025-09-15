import { useState } from "react";
import GameLobby from "./pages/GameLobby";
import ChessGame from "./pages/ChessGame";
import "@fontsource/inter";

export type AppMode = "lobby" | "game";

function App() {
  const [mode, setMode] = useState<AppMode>("lobby");
  const [gameId, setGameId] = useState<string>("");

  const startGame = (id: string) => {
    setGameId(id);
    setMode("game");
  };

  const returnToLobby = () => {
    setMode("lobby");
    setGameId("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {mode === "lobby" && <GameLobby onStartGame={startGame} />}
      {mode === "game" && <ChessGame gameId={gameId} onReturnToLobby={returnToLobby} />}
    </div>
  );
}

export default App;
