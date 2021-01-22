import React from 'react';

export function ScoreBoard(props) {
    const displayPlayers = () => {
        if (props.players.length > 0) {
            return props.players.map(player => {
                return (
                    <tr key={player._id}>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                        <td>{player.strikes}</td>
                    </tr>
                );
            });
        }
    }

    return (
        <>
            <h2>Scorecard</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Strikes</th>
                    </tr>
                    {displayPlayers()}
                </tbody>
            </table>
        </>
    );
}

export default ScoreBoard;