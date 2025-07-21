import React, { useState, useEffect } from "react";
import './quiz.css';
import axios from "axios";

// const quizData = [
//     {
//         question: "What does it mean when someone says 'no cap'?",
//         answers: ["No hat", "No limit", "Not lying", "No capture"],
//         correct: 2
//     },
//     {
//         question: "If someone has 'rizz', what do they have?",
//         answers: ["Money", "Charisma", "A disease", "Good grades"],
//         correct: 1
//     },
//     {
//         question: "What is Joshua blocks favorite phrase?",
//         answers: ["Put the fries in the bag", "How's it going!", "Fall seven times, stand up eight..", "Being quiet"],
//         correct: 0
//     },
//     {
//         question: "Someone who's 'down bad' is...",
//         answers: ["Feeling sick", "Underground", "Desperately attracted to someone", "Having a bad day"],
//         correct: 2
//     },
//     {
//         question: "What does 'bussin' mean?",
//         answers: ["Taking the bus", "Really good/delicious", "Being busy", "Making noise"],
//         correct: 1
//     },
//     {
//         question: "If you're 'catching Ls', you're...",
//         answers: ["Playing baseball", "Taking losses", "Learning languages", "Catching lizards"],
//         correct: 1
//     },
//     {
//         question: "What's a 'sigma male'?",
//         answers: ["A Greek letter", "A lone wolf type", "A mathematician", "A type of fish"],
//         correct: 1
//     },
//     {
//         question: "Which group popularized the phrase 'Full Send'?",
//         answers: ["NELK", "FAZE", "Optic", "AMP"],
//         correct: 0
//     },
//     {
//         question: "What does 'default' mean?",
//         answers: ["Middle", "Mediocre/average", "Midnight", "Midterm"],
//         correct: 1
//     },
//     {
//         question: "If something 'slaps', it...",
//         answers: ["Hits you", "Is really good", "Makes noise", "Is violent"],
//         correct: 1
//     },
//     {
//         question: "What's the meaning of 'cope'?",
//         answers: ["A type of rope", "Deal with something poorly", "Copy something", "Cooperate"],
//         correct: 1
//     },
//     {
//         question: "What is Kevin gates greatest accomplishment?",
//         answers: ["2 Phones", "Wearing a furry hat", "Start a car with his bare hands", "Playing video games"],
//         correct: 2
//     },
//     {
//         question: "What does 'touch grass' mean?",
//         answers: ["Garden work", "Go outside/get offline", "Play sports", "Be environmental"],
//         correct: 1
//     },
//     {
//         question: "Which of the AMP members levy a huge tax?",
//         answers: ["Duke deniss", "Fanum", "Kai", "NAthan B"],
//         correct: 1
//     },
//     {
//         question: "What phrase is Haliey Welch most famous for?",
//         answers: ["Skibibi", "The gym hurts", "Forgot about dat doi", "Hawk Tuah"],
//         correct: 3
//     },
//     {
//         question: "Finish the phrase: 'BBL ....'",
//         answers: ["Livy dun", "Obama", "Drake", "Nicky minaj"],
//         correct: 2
//     },
//     {
//         question: "What does 'based' mean?",
//         answers: ["Has a foundation", "Admirable/not caring what others think", "Military base", "Basic"],
//         correct: 1
//     },
//     {
//         question: "Who does every girl want?",
//         answers: ["Henry cavill", "Duke dennis", "Kai cenat", "Adin ross"],
//         correct: 1
//     },
//     {
//         question: "What's a 'vibe check'?",
//         answers: ["Testing vibrations", "Assessing the mood/energy", "Checking your phone", "A medical exam"],
//         correct: 1
//     },
//     {
//         question: "Who killed john pork",
//         answers: ["Tim cheese", "Rizzler", "Bob bacon", "Simon claw"],
//         correct: 0
//     }
// ];



function Quiz(){

//score, the screen(welcome, question, result), currentQuestion, answers[]
    const [aura, setAura] = useState(0);
    const [vibe, setVibe] = useState("welcome"); //welcome, quiz, result 
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [answer, setAnswer] = useState([]);
    const [quizData, setQuizData] = useState(null);
    


    useEffect(() => {
        axios.get("http://www.localhost:3001/getquestions").then((res) => {
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





