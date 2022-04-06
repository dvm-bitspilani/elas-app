import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/QuizQuestion.css'
import Options from "../Components/Option.jsx"
export default function QuizQuestion() {
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
        await fetch("https://bits-apogee.org/elasquiz/get_question", {
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

    return (
        <div className="QuizQuestionWrapper">
            <div class="top">
                Q1
                <div class="time">
                    08:05
                </div>
            </div>
            <div class="content">
            {question.question}
            </div>
            {/* <div class="options">
                <div class="opt selected">
                    Enter option 1 here
                </div>
                <div class="opt">
                    Enter option 2 here
                </div>
                <div class="opt">
                    Enter option 3 here
                </div>
                <div class="opt">
                    Enter option 4 here
                </div>
            </div> */}
            <Options options={question.options}/>
            <div class="submit">
                Submit
            </div>
        </div>
    )
}