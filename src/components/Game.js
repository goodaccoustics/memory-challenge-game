import React, {useState, useEffect}  from 'react';
import utils from '../misc/utils';
import PlayButton from './PlayButton';
import Tile from './Tile';

const useGameState = ()  => {


    const [tableSize, setTableSize] = useState(5);
    const [memorySize, setMemorySize] = useState(5);
    const [answer, setAnswer] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [gameStatus, setGameStatus] = useState(false);
    const [viewTimer, setViewTimer] = useState(5);
    const [playTimer, setPlayTimer] = useState(100);



    useEffect(() => {
        if (gameStatus && viewTimer > 0) {

            const timerId = setTimeout(() => {
                setViewTimer(viewTimer - 1);
            }, 1000);
            return () => clearTimeout(timerId);

        } else if (gameStatus && playTimer > 0 ) {

            const timerId = setTimeout(() => {
                setPlayTimer(playTimer - 1);
            }, 1000);
            return () => clearTimeout(timerId);

        }
    });

    const setGameState = (id) => {
        if (viewTimer === 0 && playTimer > 0) {
            if (!candidates.includes(id) && candidates.length < memorySize) {
                candidates.push(id)
                if (answer.filter( x => candidates.includes(x) ).length === memorySize) {
                    setPlayTimer(0);
                }

            } else if (candidates.includes(id)) {
                setCandidates(candidates.filter( x => x !== id ));
            }
        }
    }

    const resetGameState = () => {
        console.log("Setting Game State.");
        setViewTimer(5);
        setPlayTimer(100);
        setAnswer(utils.randomSelect(tableSize, memorySize));
        setCandidates([]);
        setGameStatus(true);
    }


    return {tableSize, memorySize, gameStatus, answer, candidates, viewTimer, playTimer, setGameState, resetGameState};
}

const Game = () => {

    const {
        tableSize,
        memorySize,
        gameStatus,
        answer,
        candidates,
        viewTimer,
        playTimer,
        setGameState,
        resetGameState
    } = useGameState();

    const onTileClick = (id) => {
        setGameState(id);
    }

    const isWon = () => {
        return answer.filter( x => candidates.includes(x) ).length === memorySize;
    }

    const tileColor = (id) => {

        return viewTimer > 0 ? (answer.includes(id) ? 'aqua' : 'lightgray') :
            isWon() && candidates.includes(id) ? 'lightgreen' :
                candidates.includes(id) ? 'coral' : 'lightgray';
    }

    return (

        <div className="game">
            <div className="help">
                {
                    !gameStatus ? `You have  ${viewTimer} seconds to memorise ${memorySize} blue random cells` :
                        viewTimer > 0 ? `You have  ${viewTimer} seconds to memorise ${memorySize} blue random cells`:
                            playTimer > 0 ? `You have ${playTimer} seconds to find the blue cells!` :
                                isWon() ? "You have won!" : "Game Over!"
                }
            </div>
            <table>
                <tbody>
                {
                    utils.range(1, tableSize).map(tr =>
                        <tr key={tr+100}>
                            {
                                utils.range(1, tableSize).map( td => {
                                        var id = utils.tdIdGenerator(tableSize, tr, td);

                                        return (
                                            <td key={id}>
                                                <Tile
                                                    tileId={id}
                                                    bgColor={tileColor}
                                                    onTileClick={onTileClick}
                                                />

                                            </td>
                                        );
                                    }
                                )
                            }
                        </tr>
                    )

                }
                </tbody>
            </table>
            <div className="help">
                {
                    !gameStatus || playTimer === 0 ? <PlayButton showText="Play" startGame={resetGameState} /> : ""
                }
            </div>
        </div>


    );
}

export default Game;

