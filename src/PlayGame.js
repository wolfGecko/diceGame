import React, { useState } from 'react';
// internal
// import DiceRoller from './DiceRoller';
import ScoreBoard from './ScoreBoard';
// mui
import Button from '@material-ui/core/Button';
import axios from 'axios';

function PlayGame(props) {
    const classes = props.useStyles();

    const [activePlayer, setActivePlayer] = useState({
        name: '',
        score: 0,
        strikes: 0
    });
    const [pot, setPot] = useState(props.game.pot);
    const [heldDice, setHeldDice] = useState([]);

    const dice = props.game.dice;

    const displayDice = () => {
        return (
            <div className="dice-wrapper">
                {dice.map((value, index) => {
                    return <span key={index} onClick={() => holdDie(index)} className={heldDice.indexOf(index) === -1 ? 'die' : 'die held'}>{value}</span>
                })}
            </div>
        );
    }

    const holdDie = die => {
        let heldDiceTemp = [...heldDice];
        const index = heldDiceTemp.indexOf(die);
        if (index === -1) heldDiceTemp.push(die);
        else heldDiceTemp.splice(index, 1);
        setHeldDice(heldDiceTemp);
    }

    const handlePot = () => {
        // if i call this method in render I get infinite loops when i set state in here 
        // let values = dice.sort(); // normally sort is sketchy for number arr in JS but since values are 1 - 6 it's safe;
        let sortedDice = [...dice].sort();
        // check the rolled dice for a bust
        let bust = false;
        let diceObj = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
        };
        sortedDice.forEach(value => { diceObj[value]++ });
        console.log(diceObj);

        const ofEach = Object.values(diceObj);
        let fiveOAK = ofEach.indexOf(5);
        let fourOAK = ofEach.indexOf(4);
        let threeOAK = ofEach.indexOf(3);
        let pair = ofEach.indexOf(2);
        let straight = ((fiveOAK === -1 && fourOAK === -1 && threeOAK === -1 && pair === -1) ? true : false);
        let ones = ofEach[0];
        let fives = ofEach[4];
        if (fiveOAK === -1 && fourOAK === -1 && threeOAK === -1 && straight === false && ones === 0 && fives === 0) bust = true;
        if (bust) {
            console.log('bust')
            return 'Bust!';
        }
    }

    const rollDice = () => {
        let toBeRolled = [];
        for (let i = 0; i < 5; i++) {
            if (heldDice.indexOf(i) === -1) toBeRolled.push(i);
        }
        axios.post(`http://localhost:4000/game/find/${props.game.accessCode}/roll`, {
            toBeRolled: toBeRolled
        }).then(res => {
            // refresh dice values on roll
            if (res.data.goodRoll === true) {
                // getting the new die values from the server NOTE: this refreshes only this user need some realtime type stuff to refresh for all users https://www.freecodecamp.org/news/how-to-create-a-realtime-app-using-socket-io-react-node-mongodb-a10c4a1ab676/
                axios.get(`http://localhost:4000/game/find/${props.game.accessCode}`).then(res => props.passGame(res.data)).catch(err => console.log(err));
                // setRolled(toBeRolled);
                // handlePot(toBeRolled);
            }
        }, err => {
            console.log(err);
        });
    }

    const bankPot = () => { console.log('CASH') }

    return (
        <>
            <div className={`${classes.root} wrapper`}>
                <h2>Dice Game<span>{props.game.accessCode}</span></h2>
                {/* <DiceRoller /> */}
                <div>{`You are ${activePlayer.name}`}</div>
                <div>{`The pot is ${handlePot()}`}</div>
                {displayDice()}
                <Button variant="contained" color="primary" onClick={rollDice} disableElevation>{`Roll ${5 - heldDice.length} Dice`}</Button>
                <Button variant="outlined" color="primary" onClick={bankPot} disableElevation>Bank</Button>
            </div>
            <div className="wrapper">
                <ScoreBoard players={props.game.players} />
            </div>
        </>
    );
}

export default PlayGame;