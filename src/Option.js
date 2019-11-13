import React, { useState } from 'react';


function Option(props) {
    const [clicked, setClicked] = useState(false);
    let letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(props.index);
    let style = {cursor: 'pointer', listStyle: 'none', maxWidth:'800px'};
    if(props.highlighted) {
        style.backgroundColor = 'yellow';
    }
    if(clicked) {
        style.fontWeight = 'bold';
        style.color = 'blue';
    }
    return <li onClick={() => setClicked(!clicked)} style={style}>
        <strong style={{marginRight:'12px'}}>{letter}.</strong> {props.text}</li>
}

export default Option;
