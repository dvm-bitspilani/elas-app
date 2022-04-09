import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizTimerComponent from "../Components/QuizTimerComponent.jsx"
import "../css/QuizTimer.css"
export default function QuizTimer() {
    let { jwt } = useParams();
    localStorage.setItem("jwt", `${jwt}`);
    const [showStartQuiz, setShowStartQuiz] = useState(false);
    const [isNavigateError, setIsNavigateError] = useState(false);
    const time = new Date();
    time.setSeconds(time.getSeconds() + 0); // 10 minutes timer
    const [TimeRemaining, setTimeRemaining] = useState(time);
    // console.log("This is jwt",jwt)
    let navigate = useNavigate();
    const handleExpiry = () => {
        console.log("expired");
        setShowStartQuiz(true);
    }
    const handleStartQuiz = () => {
        navigate('/QuizQuestion');
    }
    useEffect(() => {
        if (isNavigateError) {
            navigate('/NotLoggedIn');
        }


        (async () => {
            await fetch("https://bits-apogee.org/elasquiz/create_member", {
                headers: {
                    "content-type": "application/json",
                    'Authorization': `Bearer ${jwt}`
                },
                method: "GET",
                mode: "cors",
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                    setIsNavigateError(prev => prev = !prev)

                });
            await fetch("https://bits-apogee.org/elasquiz/get_question", {
                headers: { "content-type": "application/json" },
                method: "GET",
                mode: "cors",
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {
                    if (result.error) {
                        alert(result.error);
                        const currentDate = new Date();
                        const tomorrowDate = new Date();
                        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
                        tomorrowDate.setHours(14,0,0);
                        const deadline = new Date();
                        deadline.setHours(14,0,0);
                        if(deadline>=currentDate){
                            const difference = (deadline-currentDate)/1000;
                            time.setSeconds(time.getSeconds() + difference);
                        }
                        else{
                            const difference = (tomorrowDate-currentDate)/1000;
                            time.setSeconds(time.getSeconds() + difference);
                        }
                        // console.log(deadline, difference);
                        setTimeRemaining(time);
                    }
                    else {
                        setShowStartQuiz(prev => prev = !prev);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsNavigateError(prev => prev = !prev);
                    // time.setSeconds(time.getSeconds() + 5)
                    // setTimeRemaining(time);
                });
            console.log(TimeRemaining);

        })()



    }, [setTimeRemaining, isNavigateError]);
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
    // let TimeLeft = secondsToHms(TimeRemaining);
    return (
        <div className="QuizTimerWrapper">
            <div class="topQuizTimer">
                {/* <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path
                        d="M0.119999 10.57C0.191391 10.7541 0.298441 10.9223 0.435001 11.065L7.935 18.565C8.07486 18.7048 8.24089 18.8158 8.42363 18.8915C8.60636 18.9671 8.80221 19.0061 9 19.0061C9.39945 19.0061 9.78254 18.8474 10.065 18.565C10.2049 18.4251 10.3158 18.2591 10.3915 18.0763C10.4672 17.8936 10.5061 17.6978 10.5061 17.5C10.5061 17.1005 10.3475 16.7174 10.065 16.435L5.115 11.5L16.5 11.5C16.8978 11.5 17.2794 11.3419 17.5607 11.0606C17.842 10.7793 18 10.3978 18 9.99996C18 9.60214 17.842 9.22061 17.5607 8.93931C17.2794 8.658 16.8978 8.49996 16.5 8.49996L5.115 8.49996L10.065 3.56496C10.2056 3.42552 10.3172 3.25962 10.3933 3.07683C10.4695 2.89404 10.5087 2.69798 10.5087 2.49997C10.5087 2.30195 10.4695 2.10589 10.3933 1.9231C10.3172 1.74031 10.2056 1.57441 10.065 1.43497C9.92556 1.29437 9.75965 1.18278 9.57687 1.10663C9.39408 1.03047 9.19802 0.991268 9 0.991268C8.80198 0.991268 8.60592 1.03047 8.42313 1.10663C8.24035 1.18278 8.07444 1.29437 7.935 1.43497L0.435001 8.93497C0.298441 9.07762 0.191391 9.24584 0.119999 9.42997C-0.0300274 9.79516 -0.0300274 10.2048 0.119999 10.57Z"
                        fill="#DADADC" />
                </svg> */}
                APOGEE Trivia Challenge
                {/* <svg class="arrow2" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path
                        d="M0.119999 10.57C0.191391 10.7541 0.298441 10.9223 0.435001 11.065L7.935 18.565C8.07486 18.7048 8.24089 18.8158 8.42363 18.8915C8.60636 18.9671 8.80221 19.0061 9 19.0061C9.39945 19.0061 9.78254 18.8474 10.065 18.565C10.2049 18.4251 10.3158 18.2591 10.3915 18.0763C10.4672 17.8936 10.5061 17.6978 10.5061 17.5C10.5061 17.1005 10.3475 16.7174 10.065 16.435L5.115 11.5L16.5 11.5C16.8978 11.5 17.2794 11.3419 17.5607 11.0606C17.842 10.7793 18 10.3978 18 9.99996C18 9.60214 17.842 9.22061 17.5607 8.93931C17.2794 8.658 16.8978 8.49996 16.5 8.49996L5.115 8.49996L10.065 3.56496C10.2056 3.42552 10.3172 3.25962 10.3933 3.07683C10.4695 2.89404 10.5087 2.69798 10.5087 2.49997C10.5087 2.30195 10.4695 2.10589 10.3933 1.9231C10.3172 1.74031 10.2056 1.57441 10.065 1.43497C9.92556 1.29437 9.75965 1.18278 9.57687 1.10663C9.39408 1.03047 9.19802 0.991268 9 0.991268C8.80198 0.991268 8.60592 1.03047 8.42313 1.10663C8.24035 1.18278 8.07444 1.29437 7.935 1.43497L0.435001 8.93497C0.298441 9.07762 0.191391 9.24584 0.119999 9.42997C-0.0300274 9.79516 -0.0300274 10.2048 0.119999 10.57Z"
                        fill="#DADADC" />
                </svg> */}
            </div>
            <div className="bottom">
                <img id="questionImageQuizTimer" src={require('../assets/Logo.jpeg')} alt="Image" srcset="" />

            </div>
            <div class="content">
                {showStartQuiz ?
                    <div className="QuizHeading">
                        <h2>The Quiz is</h2>
                        <div className="TimerQuiz">
                            LIVE
                        </div>
                    </div>
                    :
                    <div className="QuizHeading">
                        <h2>The quiz will be live in</h2>
                        {/* <div className="TimerQuiz">NOT LIVE</div> */}
                        <QuizTimerComponent onTimerExpiry={handleExpiry} expiryTimestamp={TimeRemaining} />
                    </div>
                }
                <svg class="bg-image" xmlns="http://www.w3.org/2000/svg" width="248" height="248" viewBox="0 0 248 248" fill="none">
                    <g opacity="0.9">
                        <path
                            d="M226.492 166.77L214.758 178.504L214.405 178.858L214.051 178.504L196.513 160.967L196.16 160.613L196.513 160.259L208.247 148.525C208.247 148.525 208.248 148.525 208.248 148.525L208.248 148.525L208.601 148.878C210.139 147.337 212.822 147.337 214.359 148.878L226.492 166.77ZM226.492 166.77C228.279 164.988 228.28 162.084 226.493 160.305C226.492 160.304 226.492 160.304 226.492 160.304L214.713 148.525L226.492 166.77ZM131.151 247.5C130.26 247.5 129.367 247.165 128.667 246.506L128.565 246.402C127.173 244.98 127.178 242.707 128.586 241.298L130.732 239.153L130.826 239.059L130.86 238.931L139.592 206.906L203.11 143.383L203.111 143.383C207.577 138.913 215.387 138.92 219.854 143.383C219.854 143.383 219.854 143.383 219.854 143.383L231.63 155.159C236.246 159.775 236.246 167.287 231.63 171.903L168.112 235.425L136.091 244.157L135.963 244.192L135.869 244.286L133.72 246.435C133.011 247.144 132.082 247.5 131.151 247.5ZM148.335 208.442L147.982 208.795L148.335 209.149L165.873 226.687L166.226 227.04L166.58 226.687L208.918 184.349L209.271 183.995L208.918 183.642L191.38 166.104L191.026 165.75L190.673 166.104L148.335 208.442ZM145.31 216.398L144.701 215.789L144.474 216.62L139.481 234.923L139.251 235.767L140.095 235.537L158.397 230.544L159.228 230.317L158.619 229.708L145.31 216.398Z"
                            fill="#1900FF" fill-opacity="0.05" stroke="url(#paint0_linear_1313_6163)" />
                        <path
                            d="M144.124 128.829C144.447 132.987 142.942 137.055 139.999 139.998C137.311 142.686 133.743 144.167 129.945 144.167C125.405 144.167 121.1 141.974 118.428 138.309L79.7209 84.8002C79.7209 84.8001 79.7208 84.8001 79.7208 84.8001C78.6786 83.3582 78.8343 81.3675 80.0986 80.1027C81.3643 78.8448 83.36 78.6864 84.7969 79.724C84.797 79.724 84.7971 79.7241 84.7972 79.7242L138.298 118.424C138.298 118.424 138.298 118.424 138.298 118.424C141.681 120.884 143.8 124.673 144.124 128.829Z"
                            fill="#1900FF" fill-opacity="0.05" stroke="url(#paint1_linear_1313_6163)" />
                        <path
                            d="M41.6655 41.9557L41.6653 41.9558C19.8058 63.8942 7.76667 93.033 7.76667 124C7.76667 185.633 55.9881 236.197 116.68 239.993L114.735 247.12C50.9519 242.36 0.5 188.977 0.5 124C0.5 91.0945 13.2898 60.1346 36.5208 36.8254C37.937 35.4099 40.233 35.4085 41.6586 36.8188C43.0792 38.2363 43.0859 40.5315 41.6655 41.9557Z"
                            fill="#1900FF" fill-opacity="0.05" stroke="url(#paint2_linear_1313_6163)" />
                        <path
                            d="M128.151 7.84138L127.634 7.82313V8.34107V59.0736C127.634 61.0832 126.01 62.7069 124.001 62.7069C121.991 62.7069 120.367 61.0832 120.367 59.0736V4.13333C120.367 2.12374 121.991 0.5 124.001 0.5C192.098 0.5 247.501 55.9025 247.501 124C247.501 129.438 247.095 134.777 246.398 140.033H239.021C239.762 134.789 240.234 129.453 240.234 124C240.234 61.2998 190.333 10.0332 128.151 7.84138Z"
                            fill="#1900FF" fill-opacity="0.05" stroke="url(#paint3_linear_1313_6163)" />
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_1313_6163" x1="181.309" y1="139.533" x2="181.309" y2="248"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#919191" />
                            <stop offset="0.523958" stop-color="#CBCBCB" />
                            <stop offset="1" stop-color="#636363" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_1313_6163" x1="111.6" y1="78.5408" x2="111.6" y2="144.667"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#919191" />
                            <stop offset="0.523958" stop-color="#CBCBCB" />
                            <stop offset="1" stop-color="#636363" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_1313_6163" x1="58.6623" y1="35.2625" x2="58.6623" y2="247.649"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#919191" />
                            <stop offset="0.523958" stop-color="#CBCBCB" />
                            <stop offset="1" stop-color="#636363" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_1313_6163" x1="183.934" y1="0" x2="183.934" y2="140.533"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#919191" />
                            <stop offset="0.523958" stop-color="#CBCBCB" />
                            <stop offset="1" stop-color="#636363" />
                        </linearGradient>
                    </defs>
                </svg>
                {showStartQuiz && <div onClick={handleStartQuiz} className="startQuiz">Start Quiz</div>}
            </div>
        </div>
    )
}