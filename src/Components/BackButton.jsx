import React from 'react';
import { useNavigate } from "react-router-dom";
export default function BackButton() {
    let navigate = useNavigate();
    return (
        <div onClick={()=>{
            navigate(-2);
        }} className="BackButtonWrapper">
            <img src={require("../assets/Vector.png")} alt="" />
        </div>
    )
}