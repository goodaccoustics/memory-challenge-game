import React, {useState} from 'react';
import Game from '../components/Game';

export default function App () {
    const [count, setCount] = useState(0);

    return (
        <div>
            <Game key={count} initate={ () => setCount(count + 1) } />
        </div>
    );
}