import React, { useEffect, useState } from 'react';
// internal
import DiceRoller from './DiceRoller';
import ScoreBoard from './ScoreBoard';
// mui
import Button from '@material-ui/core/Button';
import axios from 'axios';

function PlayGame(props) {
    const [activePlayer, setActivePlayer] = useState({
        name: '',
        score: 0,
        strikes: 0
    });
    const [heldDice, setHeldDice] = useState([]);
    const dice = props.game.dice;


    const displayDice = () => {
        return dice.map(die => {
            return (
                <span key={die._id} onClick={() => holdDie(die._id)} className={heldDice.indexOf(die._id) === -1 ? 'die' : 'die held'}>{die.value}</span>
            );
        });
    }

    const holdDie = die => {
        let heldDiceTemp = [...heldDice];
        const index = heldDiceTemp.indexOf(die);
        if (index === -1) heldDiceTemp.push(die);
        else heldDiceTemp.splice(index, 1);
        setHeldDice(heldDiceTemp);
    }

    const rollDice = () => {
        let toBeRolled = [];
        for (let i = 0; i < 5; i++) {
            if (heldDice.indexOf(dice[i]._id) === -1) toBeRolled.push(dice[i]._id);
        }
        axios.post(`http://localhost:4000/game/find/${props.game.accessCode}/roll`, {
            toBeRolled: toBeRolled
        }).then(res => {
            // props.passGame(res.data);
            console.log(res.data)
        }, err => {
            console.log(err);
        });

        // props.passGame(res.data);

    }

    return (
        <>
            <div className="wrapper">
                <h2>Dice Game<span>{props.game.accessCode}</span></h2>
                {/* <DiceRoller /> */}
                <div>{`You are ${activePlayer.name}`}</div>
                <div>{`The pot is ${props.game.pot}`}</div>
                {displayDice()}
                <Button variant="contained" color="primary" onClick={rollDice} disableElevation>{`Roll ${5 - heldDice.length} Dice`}</Button>
            </div>
            <div className="wrapper">
                <ScoreBoard players={props.game.players} />
            </div>
        </>
    );
}

export default PlayGame;