import React, { useEffect, useState } from 'react';
// deps
import axios from 'axios';
// internal
import DiceRoller from './DiceRoller';
import ScoreBoard from './ScoreBoard';
// mui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// style sheet
import './App.css';

function App() {
  const accessCode = "A1A2";
  const score = 6900;
  const strikes = 0;

  const [pot, setPot] = useState(0);
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/game/find/${accessCode}`).then(res => {
      // console.log(res.data);
      let pot = res.data.pot;
      setPlayers(res.data.players);
      setPot(pot);
    });
  }, []);

  const addPlayer = e => {
    e.preventDefault();
    axios.post(`http://localhost:4000/game/find/${accessCode}/add-player`, {
      name: name,
      score: score,
      strikes: strikes
    }).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  return (
    <div className="bg">
      <div className="wrapper">
        <h1>Dice Game</h1>
        <DiceRoller />
        <span>{`The pot is ${pot}`}</span>
        <form onSubmit={addPlayer} noValidate autoComplete="off">
          <TextField label="Name" value={name} onChange={e => { setName(e.target.value) }} />
          <Button variant="contained" color="primary" type="submit" disableElevation>
            Join Game
          </Button>
        </form>
      </div>
      <div className="wrapper">
        <ScoreBoard players={players} />
      </div>
    </div>
  );
}

export default App;