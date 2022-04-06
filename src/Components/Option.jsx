import React from 'react';
import { useState, useEffect } from "react";
import "../css/Option.css"
export default function Option(props) {
    return (
        <div className="OptionWrapper">
            <div className="options">

                {props.options.map((answerOption) => (
                    <button className="opt" id={`button${answerOption.option_id}`}
                        onClick={() => props.handleAnswerOptionClick(answerOption.option_id)}
                    >
                        {answerOption.content}
                    </button>
                ))}

            </div>
        </div>
    )
}