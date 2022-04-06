import React from 'react';
import "../css/submitPage.css"
export default function SubmitPage() {
    return (
        <div className="SubmitPageWrapper">
            <div class="head">
                <div class="left"><img src={require("../assets/Vector.png")} alt="" /></div>
                <div class="title">Quiz</div>
                <div id="rightArrow" class="left"><img src={require("../assets/Vector.png")} alt="" /></div>
            </div>
            <div class="content">
                <div class="text">Thanks for submitting</div>
                <div class="text">Next quiz will be at 69:69</div>
            </div>
            <img class="bgImg" src={require("../assets/background.png")} alt=""></img>
        </div>
    );

}