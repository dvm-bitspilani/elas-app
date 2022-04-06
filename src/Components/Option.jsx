import React from 'react';
import { useState, useEffect } from "react";
import "../css/Option.css"
export default function Option(props) {
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
        <div className="OptionWrapper">
            <div className="options">
                <div className="opt">
                    {/* {props.options.map((answerOption) => (
                            <button
                                onClick={() => handleAnswerOptionClick(answerOption.is_correct)}
                            >
                                {answerOption.content}
                            </button>
                        ))} */}
                </div>
            </div>
        </div>
    )
}