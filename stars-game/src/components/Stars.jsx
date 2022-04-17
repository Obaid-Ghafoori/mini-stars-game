import React, { useState } from 'react';
import logicUtils from '../utils/logicUtils.js';
import colors from '../utils/colors.js';
// import { StarsStyle } from './Stars.css';
import { StarsStyle } from '../static/styles/Stars.css';
// \src\utils\logicUtils.js stars-game\..\static\styles\stars.scss


const StarMatch = () => {
    const PlayNumber = props => (
        <button
            className="number"
            style={{ backgroundColor: colors[props.status] }}
            onClick={() => console.log('Num', props.number)}>
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
    const [availableNums, setAvailableNums] = useState([1,2,3,4,5]);
    const [candidateNums, setCandidateNums] = useState([2,3]);

    const candidatesAreWrong = logicUtils.sum(candidateNums) > stars;
    const NumberStatus = (number) => { 
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';

    };

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
                        <PlayNumber
                            status={NumberStatus(number)} //pass status propety to cumpute the mocked data status that is placeed in the state
                            key={number}
                            number={number}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
};

export default StarMatch;