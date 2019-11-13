import React from 'react';


function Nav(props) {
    const {currentIndex, onPrevious, onNext } = props;
    let style = {cursor: 'pointer', marginBottom: '24px', width: '90px', marginRight: '12px'};
    return <div>
        <button onClick={onPrevious} disabled={!currentIndex} style={style}>Previous</button>
        <button onClick={onNext} style={style}>Next</button>
    </div>
}

export default Nav;
