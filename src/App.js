import React, { useState } from 'react';
// internal
import InitGame from './InitGame';
import PlayGame from './PlayGame';
// mui
import { makeStyles } from '@material-ui/core/styles';
// style sheet
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function App() {

  const [gameJoined, setGameJoined] = useState(false);
  const [game, setGame] = useState({});

  const handleGame = data => {
    // this is a callback function that InitGame or PlayGame will call to pass props back into PlayGame with update game data
    setGame(data);
    setGameJoined(true);
  }

  const handleBody = () => {
    if (gameJoined === false) return <InitGame passGame={handleGame} />
    if (gameJoined === true) return <PlayGame useStyles={useStyles} passGame={handleGame} game={game} />
  }

  return (
    <div className="bg">
      {handleBody()}
    </div>
  );
}

export default App;