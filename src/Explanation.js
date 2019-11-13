import React from 'react';


function Explanation(props) {
    const { text } = props;

    if(props.show && text) {
        return <div><p style={{maxWidth: '500px', whiteSpace: 'pre-line'}}>{text}</p></div>
    } else if (props.show && !text) {
        return <div><p style={{fontStyle: 'italic'}}>No Explanation Given</p></div>
    } else {
        return null;
    }

};

export default Explanation;
