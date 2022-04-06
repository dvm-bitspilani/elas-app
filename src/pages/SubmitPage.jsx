import React from 'react';
import BackButton from "../Components/BackButton.jsx"
import "../css/submitPage.css"
export default function SubmitPage() {
    return (
        <div className="SubmitPageWrapper">
            <div class="head">
                <div class="title">Quiz</div>
                {/* <div class="left"></div>
                <div id="rightArrow" class="left"></div> */}
            </div>
            <div class="content">
                <div class="text">Thanks for submitting</div>
                <div class="text">Next quiz will be at 69:69</div>
            </div>
            <img class="bgImg" src={require("../assets/background.png")} alt=""></img>
        </div>
    );

}