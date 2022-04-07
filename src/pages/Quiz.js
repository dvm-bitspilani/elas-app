import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Routes, Route, Link } from "react-router-dom";

export default function Quiz() {
    let navigate = useNavigate();
    useEffect(() => {

        if (localStorage.getItem("access") === "false") {
            console.log("access not allowed");
            navigate("/NotLoggedIn");
        }
        else {
            console.log("access allowed");
        }
    }, [])
    const questions = [
        {
            questionText: "What is the capital of France?",
            answerOptions: [
                { answerText: "New York", isCorrect: false },
                { answerText: "London", isCorrect: false },
                { answerText: "Paris", isCorrect: true },
                { answerText: "Dublin", isCorrect: false },
            ],
        },
        {
            questionText: "Who is CEO of Tesla?",
            answerOptions: [
                { answerText: "Jeff Bezos", isCorrect: false },
                { answerText: "Elon Musk", isCorrect: true },
                { answerText: "Bill Gates", isCorrect: false },
                { answerText: "Tony Stark", isCorrect: false },
            ],
        },
        {
            questionText: "The iPhone was created by which company?",
            answerOptions: [
                { answerText: "Apple", isCorrect: true },
                { answerText: "Intel", isCorrect: false },
                { answerText: "Amazon", isCorrect: false },
                { answerText: "Microsoft", isCorrect: false },
            ],
        },
        {
            questionText: "How many Harry Potter books are there?",
            answerOptions: [
                { answerText: "1", isCorrect: false },
                { answerText: "4", isCorrect: false },
                { answerText: "6", isCorrect: false },
                { answerText: "7", isCorrect: true },
            ],
        },
    ];

    const [question, setQuestion] = useState({});

    useEffect(async () => {
        await fetch("https://test.bits-apogee.org/elasquiz/get_question", {
            headers: { "content-type": "application/json" },
            method: "GET",
            mode: "cors",
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                console.log(result);
                setQuestion(result);
                console.log("DATE", result.start_date_time.split("-"));
                console.log(new Date("2022-04-05T21:29:38.770").getTime());
                // setQuestionsArr(result);
            });
    }, []);

    const [start, setStart] = useState(true);
    const [standby, setStandby] = useState(true);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        setStandby(true);
        setStart(false);
    };
    return (
        <div className="app">
            {standby ? (
                <div className="score-section">
                    {start ? (
                        <button onClick={() => setStandby(false)}>Click to start</button>
                    ) : (
                        <p>Thanks for attempting the quiz</p>
                    )}
                </div>
            ) : (
                <div className="parent-qa">
                    <div className="question-section">
                        <div className="question-count">
                            <span>Question</span>
                        </div>
                        <div className="question-text">{question.question}</div>
                    </div>
                    <div className="answer-section">
                        {question.options.map((answerOption) => (
                            <button
                                onClick={() => handleAnswerOptionClick(answerOption.is_correct)}
                            >
                                {answerOption.content}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
