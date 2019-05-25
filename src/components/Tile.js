import React from 'react';

const Tile = props => {
    return (
        <div
            style={{backgroundColor : props.bgColor(props.tileId), width: "100%", height: "100%"}}
            onClick={ () => props.onTileClick( props.tileId ) }
        >
            &nbsp;
        </div>
    );

}

export default Tile;