import React, { useState, useEffect } from "react";
import './quiz.css';
import axios from "axios";


function Quiz(){

//score, the screen(welcome, question, result), currentQuestion, answers[]
    const [aura, setAura] = useState(0);
    const [vibe, setVibe] = useState("welcome"); //welcome, quiz, result 
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [answer, setAnswer] = useState([]);
    const [quizData, setQuizData] = useState(null);
    


    useEffect(() => {
        axios.get("http://api.brainrotquiz.me/getquestions").then((res) => {
            console.log(res.data);
            setQuizData(res.data)
        }).catch((err) => {
            console.log("AXIOS Error: ", err);
        })

    },[])



    function startQuiz(){
        console.log("yap");
        setVibe("quiz")
    }


    function answerQuestion(answerIndex) {
        const currentQuestion = quizData[currentQuestionNumber];

        console.log("answer Index ", answerIndex)
        console.log(currentQuestion);


        if(currentQuestion.correctAnswer === answerIndex){
            console.log("increasng aura")
            setAura(aura + 1);
        }

        const newAnswer = [...answer, answerIndex];
        setAnswer(newAnswer)

        if(currentQuestionNumber < quizData.length - 1){
            setCurrentQuestionNumber(currentQuestionNumber + 1)
        }else{
                setVibe("result");
        }
       
    }


    if(vibe === "welcome"){
        return (
            <div className="quiz-container"> 
            <span className="emoji-decoration emoji-top-left">✨</span>
            <span className="emoji-decoration emoji-top-right">🎯</span>
            <span className="emoji-decoration emoji-bottom-left">🔥</span>
            <span className="emoji-decoration emoji-bottom-right">💯</span>
            <h1 className="question-text"> Welcome to my quiz!!!!!!!! </h1>
            <p>Please press the button below to start the quiz!!!</p>

            <button className="restart-button" onClick={startQuiz} >Start</button>
            
            
            </div>
        );
    } if (vibe === "quiz"){
        let currentQuestion = quizData[currentQuestionNumber];
        return (
            <div className="quiz-container"> 
            <div className="question-section">
                <div className="question-count">
                    <span>Question {currentQuestionNumber + 1}</span>/{quizData.length}
                </div>
                <div className="question-text">{currentQuestion.question}</div>
            </div>

            <div className="answer-section">{
                currentQuestion.answers.map((answer, index) => (
                    <button className="answer-button" key={index}
                        onClick={() => answerQuestion(index)}

                    > 
                    {answer}
                    </button>
            ))
            }
            </div>
            </div>
        );
    }else {
        return (
            <div className="quiz-container">
            <div className="score-section"> 
            <h1 className="score-text"> Quiz completed!!! 🎉 </h1>
            <h2 className="score-text"> You scored {aura} out of {quizData.length} </h2>
            <p className="score-text">
                {aura > quizData.length * 0.8 ? "Amazing! You're a true brainrot master! 🔥" :
                 aura > quizData.length * 0.6 ? "Good job! You know your memes! 😎" :
                 aura > quizData.length * 0.4 ? "Not bad! Keep scrolling TikTok! 📱" :
                 "You need more internet time! 💀"}
            </p>
            <button className="restart-button" onClick={() => window.location.reload()}>
                Try Again 🔄
            </button>
            </div>
            </div>
        );
    }



}

export default Quiz;





