import React , { useState } from 'react';



function ExamSelector(props){
    const { exams, ...other } = props;

    let style = {marginBottom: '12px', display: 'block'};
    if(exams.length === 1){
        return null;
    }

    return <select style={style} {...other}>
        {exams.map((exam, index) => {
            return <option value={index}>{exam.name}</option>
        })}
    </select>

}

export default ExamSelector;
