import React from 'react';
import './Button.css';


function Button(props) {
    const { onClick, text, hint } = props;
    let style = {cursor: 'pointer', marginRight: '12px', marginBottom: '12px', width: '120px'};
    let hintText = hint ? `(${hint})` : null;

    const handleKey = (e) => {
        console.log("hi ", e);
    }

    return <div><button onKeyPress={handleKey} onClick={onClick} style={style}>{text}</button><span className='desktopOnly'>{hintText}</span></div>
}

export default Button;
