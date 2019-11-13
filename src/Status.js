import React from 'react';
import Timer from './Timer';


function Status(props) {
    const {questionId, currentQuestion, totalMinutes, totalQuestions, totalCorrect, percentCorrect, totalWrong, examLength} = props;
    let style = {marginRight : '12px'};

    return <div>
        <div>
            {totalMinutes ? <Timer minutes={totalMinutes} /> : null}
            {examLength ? <span style={{display: 'block'}}><b>Progress:</b> {totalWrong+totalCorrect}/{examLength}</span> : null}
            <span style={style}><b>Correct:</b> {totalCorrect}</span>
            <span style={style}><b>Percentage:</b> {percentCorrect.toFixed(0)}%</span>
        { totalWrong > 0 ? <span style={{fontStyle: 'italic'}}>(Wrong Answers: {totalWrong})</span> : null}
        </div>
        <span style={style}>Question {currentQuestion+1} of {totalQuestions} {questionId ? <i>(Question ID: {questionId})</i> : null}</span>
    </div>

}

export default Status;
