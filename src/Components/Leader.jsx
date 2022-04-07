import React from "react";
import "../css/Leader.css";

export default function Leader(props) {
  return (
    <div className="Leader" id={`Leader-${props.rank}`}>
      <div className="Leader-img-cont">
        <img
          src={require("../assets/crown.png")}
          alt="crown"
          className="Leader-crown"
          style={{ display: props.rank === 1 ? "block" : "none" }}
        />
        <img
          src={props.img}
          alt={props.name}
          className="Leader-img"
          style={{ borderColor: props.color }}
        />
        <div className="Leader-rank" style={{ backgroundColor: props.color }}>
          {props.rank}
        </div>
      </div>
      <div className="Leader-name">{props.name}</div>
    </div>
  );
}
