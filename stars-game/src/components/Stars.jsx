import React, { useState } from 'react';
import logicUtils from '../utils/logicUtils.js';
// import { StarsStyle } from './Stars.css';
import { StarsStyle } from '../static/styles/Stars.css';
// \src\utils\logicUtils.js stars-game\..\static\styles\stars.scss


const StarMatch = () => {
    const PlayNumber = props => (
        <button className="number" onClick={() => console.log('Num', props.number)}>
            {props.number}
        </button>
    );

    const StarsDisplay = props => (
        <>
            {logicUtils.range(1, props.count).map(starId => (
                <div key={starId} className="star" />
            ))}
        </>
    );

    const [stars, setStars] = useState(logicUtils.random(1, 9));
    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    <StarsDisplay count={stars} />
                </div>
                <div className="right">
                    {logicUtils.range(1, 9).map(number =>
                        <PlayNumber key={number} number={number} />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
};

export default StarMatch;