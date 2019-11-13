import React , { useState, useEffect } from 'react';


function Timer(props) {
    const { minutes } = props;
    const [minute, setMinute] = useState(minutes);
    const [second, setSecond] = useState(0);

    useEffect(() => {
        setMinute(minutes);
        setSecond(0);
    }, [minutes]);

    const tick = () => {
        if(second === 0){
            setSecond(59);
            setMinute(m => m - 1);
        } else {
            setSecond(s => s - 1);
        }
    }

    useEffect(() => {
        let interval = null;

        interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    });

    return minutes ? <span><span style={{fontWeight: 'bold'}}>Timer:</span> {minute}:{second < 10 ? '0' : ''}{second}</span> : null;
}

export default Timer;
