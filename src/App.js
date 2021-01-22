import React, { useState } from 'react';
// internal
import InitGame from './InitGame';
import PlayGame from './PlayGame';
// style sheet
import './App.css';

function App() {
  const [gameJoined, setGameJoined] = useState(false);
  const [game, setGame] = useState({});

  const handleGame = data => {
    setGame(data);
    setGameJoined(true);
  }

  const handleBody = () => {
    if (gameJoined === false) return <InitGame passGame={handleGame} />
    if (gameJoined === true) return <PlayGame passGame={handleGame} game={game} />
  }

  return (
    <div className="bg">
      {handleBody()}
    </div>
  );
}

export default App;