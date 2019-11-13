import React, { useEffect, useState } from 'react';
import Question from './Question';
import Status from './Status';
import ExamSelector from './ExamSelector';
import Nav from './Nav';
import './App.css';
import exams from './exams';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import shuffle from './shuffle';


function App() {
    let initialExam = exams[0];

    debugger;
    let cleanExam = initialExam.questions.map(question => {
        if(Array.isArray(question)) {
            return question;
        }

        if(question.type || question.answer === '') {
            return null;
        }

        let q = Object.assign({}, question);

        if(!q.explanation || q.explanation.match(/^ *$/) !== null){
            delete q.explanation;
        }

        return q;
    }).filter(v => v) ;
    let randomExam = shuffle(cleanExam);

    const [currentExamIndex, setCurrentExamIndex] = useState(0);
    const [exam, setExam] = useState(exams[currentExamIndex]);
    const [examQuestions, setExamQuestions] = useState(randomExam);
    const [totalCorrect, setTotalCorrect ] = useState(0);
    const [totalWrong, setTotalWrong] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [question, setQuestion] = useState(examQuestions[currentQuestionIndex]);
    const [totalQuestions, setTotalQuestions] = useState(examQuestions.length);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [results, setResults] = useState({});
    const [randomize, setRandomize] = useState(true);

    useEffect(() => {
        setExam(exams[currentExamIndex]);
    }, [currentExamIndex]);

    useEffect(() => {
        setQuestion(examQuestions[currentQuestionIndex]);
    }, [examQuestions, currentQuestionIndex]);

    useEffect(() => {
        let cleanExam = exam.questions.map(question => {
            if(Array.isArray(question)) {
                return question;
            }

            if(question.type || question.answer === '') {
                return null;
            }

            let q = Object.assign({}, question);

            if(!q.explanation || q.explanation.match(/^ *$/) !== null){
                delete q.explanation;
            }

            return q;
        }).filter(v => v) ;
        if(randomize){
            let randomExam = shuffle(cleanExam);
            setExamQuestions(randomExam);
            setTotalQuestions(randomExam.length);
        } else {
            setExamQuestions(cleanExam);
            setTotalQuestions(cleanExam.length);
        }

        setTotalCorrect(0);
        setTotalWrong(0);
        setCurrentQuestionIndex(0);
        setAnsweredQuestions([]);
        setResults({});

    }, [exam, randomize]);


    const handleNext = (e) => {
        setCurrentQuestionIndex(currentQuestionIndex < examQuestions.length - 1? currentQuestionIndex+1 : 0);
    }

    const handlePrevious = () => {
        setCurrentQuestionIndex(currentQuestionIndex > 0 ? currentQuestionIndex-1 : examQuestions.length);
    }

    const handleAnswer = (response) => {
        let updated = Object.assign({}, results); 
        updated[`${currentQuestionIndex}`] = response;
        setResults(updated);

        let totalWrong = 0;
        let totalCorrect = 0;
        Object.keys(updated).forEach(q => {
            if(updated[q]){
                totalCorrect += 1;
            } else {
                totalWrong += 1;
            }
        });

        setTotalWrong(totalWrong);
        setTotalCorrect(totalCorrect);
        handleNext()
    }

    const handleKeyPress = (key , e) => {
        switch(key) {
            case 'right':
                if(currentQuestionIndex < examQuestions.length) {
                    handleNext();
                } else {
                    setCurrentQuestionIndex(0);
                }
                break;
            case 'left':
                if(currentQuestionIndex > 0) {
                    handlePrevious();
                } else {
                    setCurrentQuestionIndex(examQuestions.length - 1);
                }
                break;
            case 'w':
                if(answeredQuestions.includes(currentQuestionIndex)) {
                    handleAnswer(false);
                } 
                break;
            case 'space':
                if(answeredQuestions.includes(currentQuestionIndex)) {
                    handleAnswer(true);
                } else {
                    setAnsweredQuestions(o => [...o, currentQuestionIndex])
                }
                break;
            default:
                break;
        }
    }

  return (
    <div className="App">
        <KeyboardEventHandler 
            handleKeys={['w', 'space', 'right', 'left']}
            onKeyEvent={handleKeyPress} />
        <ExamSelector exams={exams} onChange={(e) => setCurrentExamIndex(e.target.value)} />
        <input style={{marginBottom: '12px'}} type='checkbox' onClick={() => setRandomize(!randomize)} checked={randomize} /> Random Exam
        <Nav onNext={handleNext} 
            currentIndex={currentQuestionIndex}
            onPrevious={handlePrevious} />
        <Status totalWrong={totalWrong} 
              totalMinutes={exam.minutes}
            totalQuestions={totalQuestions} 
                examLength={exam.examLength}
                questionId={question.question}
           currentQuestion={currentQuestionIndex} 
              totalCorrect={totalCorrect} 
            percentCorrect={(totalCorrect+totalWrong) ? (totalCorrect/(totalCorrect+totalWrong))*100 : 0} />
        <Question 
            onCorrect={() => handleAnswer(true)}
            onWrong={() => handleAnswer(false)}
            showAnswer={answeredQuestions.includes(currentQuestionIndex)}
            onShowAnswer={() => setAnsweredQuestions(o => [...o, currentQuestionIndex])}
            index={currentQuestionIndex}
            question={question}
             />
    </div>
  );
}

export default App;
