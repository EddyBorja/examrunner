import React, { useState } from 'react';
import Option from './Option';
import Button from './Button';
import Explanation from './Explanation';
import './fade.css';
import { CSSTransitionGroup } from 'react-transition-group';

let numbers = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine'
};

function Question(props) {
    //TODO: refactor into two separate components based on question type
    const { onCorrect, onWrong, onShowAnswer, showAnswer, question, index } = props;

    let questionId, explanation, text;
    let answer = null;
    let multipleChoice = null;
    let answerIndex = 0;
    let options = [];

    console.log("Question is ", question);
    if (Array.isArray(question)){
        questionId = index;
        text = question[0];
        answer = question[1];
        explanation = question[2] || '';

    } else if(typeof question === 'object') {

        questionId = question.question;
        explanation = question.explanation;
        text = question.text;
        options = question.options.split('\n').filter(v => {
            if(!v) {
                return false;
            }
            return v.trim() !== '';
        });

        let answerChars = question.answer.split('');
        answerIndex = answerChars.map(a => {
            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(a.toUpperCase());
        });

        if(answerIndex.length > 1) {
            let number = numbers[`${answerIndex.length}`] || answerIndex.length;

            multipleChoice = <p style={{fontStyle: 'italic', paddingLeft: '12px'}} key={`${questionId}`}>
                                (Choose {number}.)</p>
        }
    } else {
        return <p>Unknown Question Format</p>
    }

    let buttons;
    if(showAnswer) {
        buttons = [ 
            <Button onClick={onWrong} text='Mark Wrong' hint='Press W' />,
            <Button onClick={onCorrect} text='Mark Correct' hint='Press Spacebar'/>
        ];
    } else {
        buttons = <Button onClick={onShowAnswer} text='View Answer' hint='Press Spacebar' />
    }

    return (
        <div>
        <CSSTransitionGroup transitionName='fade' transitionEnterTimeout={250}
                  transitionLeave={false}>
        <p key={`${questionId}text`} style={{whiteSpace:'pre-line', maxWidth: '500px'}}>{text}</p>
        {multipleChoice}
        <ul key={`${questionId}options`}>{options.map((option, index) => {
            let highlight = answerIndex.includes(index);
            return <Option highlighted={highlight && showAnswer} index={index} text={option}>option</Option>
        })}</ul>
        { answer && showAnswer ? <p style={{color: 'blue', fontWeight: 'bold'}}>{answer}</p> : null}
        {buttons}
        <Explanation show={showAnswer} text={explanation} />
        </CSSTransitionGroup>
        </div>
    );
}

export default Question;
