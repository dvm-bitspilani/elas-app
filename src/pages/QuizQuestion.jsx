import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/QuizQuestion.css'
import Options from "../Components/Option.jsx"
import QuestionTimer from "../Components/QuestionTimer.jsx"


export default function QuizQuestion() {
    let navigate = useNavigate();
    const [start, setStart] = useState(true);
    const [selectedOption, setSelectedOption] = useState(0);
    const [questionTimeRemaining, setQuestionTimeRemaining] = useState(0);
    const [initialTime, setInitialTime] = useState(new Date());
    const [isNavigate, setIsNavigate] = useState(false);

    useEffect(() => {

        if (isNavigate) {
            navigate('/SubmitPage')
        }
    }, [isNavigate, navigate])

    const handleAnswerOptionClick = (index, option_id) => {
        for (var i = 0; i < options.length; i++) {
            document.getElementById(`button${i}`).classList.remove("selected");
        }
        document.getElementById(`button${index}`).classList.add("selected");
        console.log("option chosen", option_id);
        setSelectedOption(option_id);
    };
    function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h === 1 ? " : " : " : ") : "";
        var mDisplay = m > 0 ? m + (m === 1 ? " : " : " : ") : "";
        var sDisplay = s > 0 ? s + (s === 1 ? " : " : "") : "";
        return hDisplay + mDisplay + sDisplay;
    }
    const handleSubmit = async () => {
        // console.log(TimeRemaining)
        let currentTime = new Date();
        let time_taken = currentTime.getSeconds() - initialTime.getSeconds();
        const submission = {
            option_id: selectedOption,
            question_id: question.question_id,
            time_taken: time_taken
        }
        console.log(submission);
        console.log(currentTime, initialTime, time_taken);
        let jwt = localStorage.getItem('jwt')
        await fetch("https://bits-apogee.org/elasquiz/post_answer/", {
            headers: { "content-type": "application/json", 'Authorization': `Bearer ${jwt}` },
            method: "POST",
            body: JSON.stringify(submission),
            mode: "cors",
        })
            .then(function (response) {
                console.log("hi");
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(function (result) {
                if (!result.error) {
                    console.log(result);
                    if (result.message) {
                        alert(result.message);
                    }
                    setIsNavigate(prev => prev = !prev);
                }
                else {
                    alert(result.error);
                    setIsNavigate(prev => prev = !prev);
                }
            }).catch((err) => {
                console.log(err);
                
                alert("No Option Selected");
                setIsNavigate(prev => prev = !prev);
            })
    }
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
    const [question, setQuestion] = useState([]);
    const [options, setOptions] = useState([]);
    const time = new Date();
    time.setSeconds(time.getSeconds() + 10); // 10 minutes timer
    const [questionExpiry, setQuestionExpiry] = useState(time);
    useEffect(() => {
        (async () => {
            await fetch("https://bits-apogee.org/elasquiz/get_question", {
                headers: { "content-type": "application/json" },
                method: "GET",
                mode: "cors",
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {
                    if (!result.error) {
                        console.log(result);
                        setQuestion(result);
                        console.log(result.options)
                        setOptions(result.options)
                        console.log(parseInt(result.attempt_time));
                        localStorage.setItem("question_id", result.question_id);
                        // console.log("DATE", result.start_date_time.split("-"));
                        // console.log(new Date("2022-04-05T21:29:38.770").getTime());
                        // time.setSeconds(time.getSeconds() + parseInt(result.attempt_time));
                        console.log(time);
                        setQuestionExpiry(time);
                        // setQuestionExpiry(result.attempt_time);


                        // setQuestionsArr(result);
                    }
                    else {
                        alert(result.error);

                    }
                }).catch((err) => {
                    console.log("API ERROR", err);
                    const staticQuestion = [
                        {
                            question: "Static Question",
                            question_id: "1",
                            image_url: "https://www.poynter.org/wp-content/uploads/2021/09/shutterstock_1563012205.png",
                            attempt_time: 5,
                        }
                    ]
                    const staticOptions = [
                        {
                            option_id: 1,
                            content: "Option1"
                        },
                        {
                            option_id: 2,
                            content: "Option2"
                        },
                        {
                            option_id: 3,
                            content: "Option3"
                        },
                        {
                            option_id: 4,
                            content: "Option4"
                        },
                    ]
                    setOptions(staticOptions);
                    setQuestion(staticQuestion[0]);
                    setQuestionTimeRemaining(staticQuestion[0].attempt_time);
                    time.setSeconds(time.getSeconds() + staticQuestion[0].attempt_time)
                    setQuestionExpiry(time);
                    console.log()
                    console.log(questionTimeRemaining);
                    // console.log(options);

                });
        })()

    }, [setQuestion, setOptions, setQuestionTimeRemaining]);


    return (
        <div className="QuizQuestionWrapper">
            <div class="top">
                Q1
                <QuestionTimer onTimerExpiry={handleSubmit} expiryTimestamp={questionExpiry} />
            </div>
            <div class="content">
                <div className="img">
                    <img id="questionImage" src={require('../assets/Logo.jpeg')} alt="Image" srcset="" />
                </div>
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
            <Options options={options} handleAnswerOptionClick={handleAnswerOptionClick} />
            <div class="submit" onClick={handleSubmit}>
                Submit
            </div>
        </div>
    )
}