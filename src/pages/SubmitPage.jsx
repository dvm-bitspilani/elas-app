import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizTimerComponent from "../Components/QuizTimerComponent.jsx"
import BackButton from "../Components/BackButton.jsx"
import "../css/submitPage.css"
export default function SubmitPage() {
    let navigate = useNavigate();
    const [isNavigateGameShow, setIsNavigateGameShow] = useState(false);
    const [isNavigatePrelims, setIsNavigatePrelims] = useState(false);
    const [isNavigateQuiz, setIsNavigateQuiz] = useState(false);
    const [TimeRemaining, setTimeRemaining] = useState(0)
    const time = new Date();
    time.setSeconds(time.getSeconds() + 0); // 10 minutes timer

    const handleGameShowLeaderboard = () => {
        console.log("LEADERBOARD");
            setIsNavigateGameShow(prev => prev = !prev);
            // setIsNavigatePrelims(prev => prev = !prev);
    }
    const handlePrelimsLeaderboard = () => {
        console.log("LEADERBOARD");
            // setIsNavigateGameShow(prev => prev = !prev);
            setIsNavigatePrelims(prev => prev = !prev);
    }
    const handleExpiry = () => {
        console.log("expired");
        setIsNavigateQuiz(prev => prev = !prev);
    }


    useEffect(() => {

        if (isNavigateGameShow) {
            navigate('/GameShowLeaderboard')
        }
        if (isNavigatePrelims) {
            navigate('/PrelimsLeaderboard')
        }
        if (isNavigateQuiz) {
            // navigate('/QuizQuestion')
        }
        (async () => {
            await fetch("https://test.bits-apogee.org/elasquiz/get_question", {
                headers: { "content-type": "application/json" },
                method: "GET",
                mode: "cors",
            })
                .then(function (response) {
                    return response.json();

                })
                .then(function (result) {
                    setTimeRemaining(result.time_remaining);
                }).catch((err) => {
                    console.log("API ERROR", err);
                    setTimeRemaining(20000);

                });
        })()
    }, [isNavigateGameShow, isNavigatePrelims, navigate, isNavigateQuiz, setTimeRemaining])

    return (
        <div className="SubmitPageWrapper">
            <div class="headSubmit">
                <div class="title">APOGEE Trivia Challenge</div>
                {/* <div class="left"></div>
                <div id="rightArrow" class="left"></div> */}
            </div>
            <div class="content">
                <div class="text">Thanks for submitting</div>
                <div className="buttons">
                <div class="leaderboardBtn" onClick={handleGameShowLeaderboard}>
                   Gameshow Leaderboard
                </div>
                <div class="leaderboardBtn" onClick={handlePrelimsLeaderboard}>
                    Prelims Leaderboard
                </div>
                {/* <div class="text">Next quiz will be at <QuizTimerComponent onTimerExpiry={handleExpiry} expiryTimestamp={TimeRemaining} /></div> */}
                </div>
            </div>
            <img class="bgImg" src={require("../assets/background.png")} alt=""></img>
        </div>
    );

}