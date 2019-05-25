import React from 'react';

const PlayButton = (props) => {
    return (
      <button onClick={props.startGame}>
          {props.showText}
      </button>
    );
}

export default PlayButton;