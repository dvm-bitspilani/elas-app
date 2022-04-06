import React from 'react';
import "../css/livePage.css"
export default function LivePage() {
    return (
        <div className="LivePageWrapper">
            <div class="head">
                <div class="left"><img src={require("../assets/Vector.png")} alt=""/></div>
                    <div class="title">Quiz</div>
                    <div id="rightArrow" class="left"><img src={require("../assets/Vector.png")} alt=""/></div>
                    </div>
                    <div class="content">
                        <div class="text">The Quiz is now:</div>
                        <div class="button">LIVE</div>
                    </div>
                    <img class="bgImg" src={require("../assets/background.png")} alt=""/>
                        <div class="purpleButton">
                            <div class="start">START QUIZ</div>
                        </div>
        </div>
                    )
}