import React from "react";
import "../css/LeaderboardEntry.css";

export default function LeaderboardEntry(props) {
  return (
    <div className="LeaderboardEntry">
      {props.name}
      <div className="LeaderboardEntry-rank">{props.rank}</div>
    </div>
  );
}
