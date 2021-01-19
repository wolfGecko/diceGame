import React, { useRef, useState } from 'react';
//dice
import ReactDice from 'react-dice-complete';
// MUI components
import Button from '@material-ui/core/Button';
// stylesheets - dice
import 'react-dice-complete/dist/react-dice-complete.css';

export function DiceRoller() {
    const diceRef = useRef(null);
    const [total, setTotal] = useState('');

    const handleRollDone = num => {
        console.log(num);
        setTotal(num);
    }

    const handleRollAll = () => {
        diceRef.current.rollAll();
    }

    return (
        <div>
            <div className="score-text">Your score is</div>
            <div className="score">{total}</div>
            <ReactDice
                defaultRoll={1}
                disableIndividual={true}
                dotColor="#ffffff"
                faceColor="#3f51b5"
                numDice={5}
                outline={true}
                outlineColor="#181e44"
                ref={dice => diceRef.current = dice}
                rollDone={handleRollDone}
            />
            <Button variant="contained" color="primary" onClick={handleRollAll}  className="roll-btn" disableElevation>
                Roll All
            </Button>
        </div>
    );
}

export default DiceRoller;