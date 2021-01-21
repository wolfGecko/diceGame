import React from 'react';

export function ScoreBoard(props) {
    const displayPlayers = () => {
        console.log(props.players)
        if (props.players.length > 0) {
            return props.players.map(player => {
                return (
                    <div>{player.name}, {player.score}, {player.strikes}</div>
                );
            });
        }
    }

    return (
        <div>{displayPlayers()}</div>
    );
}

export default ScoreBoard;