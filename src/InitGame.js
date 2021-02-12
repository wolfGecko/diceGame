import React, { useState } from 'react';
import axios from 'axios';
// mui
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export function InitGame(props) {
    const [showCreate, setShowCreate] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [name, setName] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const classes = useStyles();

    const createGame = e => {
        e.preventDefault();
        axios.post(`http://localhost:4000/game/new`, {
            accessCode: accessCode,
            activePlayer: '',
            dice: [1, 1, 1, 1, 1],
            players: [
                { name: name, score: 0, strikes: 0 }
            ],
            pot: 0
        }).then(res => {
            props.passGame(res.data);
        }, err => {
            console.log(err);
        });
    }

    const joinGame = e => {
        e.preventDefault();
        console.log(name, accessCode);
        axios.get(`http://localhost:4000/game/find/${accessCode}`).then(res => props.passGame(res.data)).catch(err => setErrorMessage('Invalid Access Code.'));
    }

    const handleCollapse = show => {
        if (show === 'create') {
            setAccessCode('');
            setName('');
            setShowCreate(true);
            setShowJoin(false);
        } else {
            // DEFAULT VALUE IS DEV-HELPER --- REMEBER TO GET RID OF THIS!!!
            setAccessCode('A1A8');
            setName('');
            setShowCreate(false);
            setShowJoin(true);
        }
    }

    return (
        <>
            <div className={`${classes.root} wrapper`}>
                <h1>Welcome to Dice Game</h1>

                <Button variant="outlined" color="primary" onClick={() => handleCollapse('create')} disableElevation>
                    Create Game
                </Button>

                <Button variant="outlined" color="primary" onClick={() => handleCollapse('join')} disableElevation>
                    Join Game
                </Button>

                <Collapse in={showCreate}>
                    <form className="init-form" onSubmit={createGame}>
                        <h4>Create Game</h4>
                        <TextField label="Access Code" className="init-form-item" value={accessCode} onChange={e => { setAccessCode(e.target.value) }} />
                        <br />
                        <TextField label="Nickname" className="init-form-item" value={name} onChange={e => { setName(e.target.value) }} />
                        <br />
                        <Button variant="contained" color="primary" type="submit" disableElevation>Submit</Button>
                    </form>
                </Collapse>

                <Collapse in={showJoin}>
                    <form className="init-form" onSubmit={joinGame}>
                        <h4>Join Game</h4>
                        <TextField label="Access Code" className="init-form-item" value={accessCode} onChange={e => { setAccessCode(e.target.value) }} />
                        {/* <br /> */}
                        {/* <TextField label="Nickname" className="init-form-item" value={name} onChange={e => { setName(e.target.value) }} /> */}
                        <br />
                        <Button variant="contained" color="primary" type="submit" disableElevation>Submit</Button>
                    </form>
                </Collapse>
                { errorMessage.length > 0 && 
                    <div className="error-message">{errorMessage}</div>
                }
            </div>
        </>
    );
}

export default InitGame;