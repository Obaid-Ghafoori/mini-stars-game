import React, { useEffect, useState } from 'react';
import logicUtils from '../utils/logicUtils.js';
import colors from '../utils/colors.js';
// import { StarsStyle } from './Stars.css';
import { StarsStyle } from '../static/styles/Stars.css';
// \src\utils\logicUtils.js stars-game\..\static\styles\stars.scss


const StarMatch = () => {
    const [stars, setStars] = useState(logicUtils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(logicUtils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);


    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    });

    const StarsDisplay = props => (
        <>
            {logicUtils.range(1, props.count).map(starId => (
                <div key={starId} className="star" />
            ))}
        </>
    );

    const PlayNumber = props => (
        <button
            className="number"
            style={{ backgroundColor: colors[props.status] }}
            onClick={() => props.onClick(props.number, props.status)}
        >
            {props.number}
        </button>
    );

    const PlayAgain = props => (
        <div className="game-done">
            <div
                className="message"
                style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
            >
                {props.gameStatus === 'lost' ? 'Game Over' : 'Congrats!'}
            </div>
            <button onClick={props.onClick}>Play Again</button>
        </div>
    );

    const candidatesAreWrong = logicUtils.sum(candidateNums) > stars;


    const gameStatus = availableNums.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active'  

    const resetGame = () => {
        setStars(logicUtils.random(1, 9));
        setAvailableNums(logicUtils.range(1, 9));
        setCandidateNums([]);
    };

    const NumberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';

    };

    const onNumberClick = (number, currentStatus) => {
        //once the number is clicked, we can't used/click it again
        if (gameStatus !== 'active' || currentStatus === 'used') {
            return;
        }

        //if the number is available which is not used, we can click it we can make 
        //it candidate number by adding it to the existing candidate number array
        const newCandidateNums =
            currentStatus === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(existingCandidatNum => existingCandidatNum !== number); //keep all the candidate nums except the number that was clicked


        //check if the sum of the candidate number is not equal to the count of stars
        // then we dont have a correct answer and we just need to mark it as candidate numbers
        if (logicUtils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);

        } else {
            //if the sum of the candidate number is equal to the count of stars then we have a correct answer
            // all candidate numbers should be removed from the available numbers array if the num exists in new candidate nums
            // in other words it should be marked as a used
            // and reset the candidate number array to empty array 
            // redraw the stars from what is left in the available numbers array
            const newAvailableNums = availableNums.filter(
                num => !newCandidateNums.includes(num)
            );

            setStars(logicUtils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== 'active' ? (
                        <PlayAgain onClick={resetGame} gameStatus={gameStatus} />
                    ) : (
                        <StarsDisplay count={stars} />
                    )}
                </div>
                <div className="right">
                    {logicUtils.range(1, 9).map(number => (
                        <PlayNumber
                            key={number}
                            status={NumberStatus(number)}
                            number={number}
                            onClick={onNumberClick}
                        />
                    ))}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

export default StarMatch;