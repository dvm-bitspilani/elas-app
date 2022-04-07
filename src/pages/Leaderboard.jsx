import React, { useEffect } from "react";
import Leader from "../Components/Leader";
import LeaderboardEntry from "../Components/LeaderboardEntry";
import "../css/LeaderBoard.css";

export default function Leaderboard() {
  const rank = 69;
  const leaders = [
    {
      name: "Will Smith",
      rank: 1,
      color: "#FFF504",
      img: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-04/will-smith-lc-main-220401-9ac255.jpg",
    },
    {
      name: "Will Smith",
      rank: 2,
      color: "#4DE9FD",
      img: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-04/will-smith-lc-main-220401-9ac255.jpg",
    },
    {
      name: "Will Smith",
      rank: 3,
      color: "#FF9DFA",
      img: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-04/will-smith-lc-main-220401-9ac255.jpg",
    },
  ];
  const top10 = [
    { name: "Ankush Jain", rank: 4 },
    { name: "Ankush Jain", rank: 5 },
    { name: "Ankush Jain", rank: 6 },
    { name: "Ankush Jain", rank: 7 },
    { name: "Ankush Jain", rank: 8 },
    { name: "Ankush Jain", rank: 9 },
    { name: "Ankush Jain", rank: 10 },
  ];

  return (
    <div className="Leaderboard">
      <h1 className="Leaderboard-heading">Leaderboard</h1>
      <div className="Leaderboard-leaders">
        {leaders.map((leader, idx) => (
          <Leader
            img={leader.img}
            name={leader.name}
            color={leader.color}
            rank={leader.rank}
            key={`leader-${idx}`}
          />
        ))}
      </div>
      <div className="Leaderboard-rank-cont">
        Your Current Rank
        <div className="Leaderboard-rank">{rank}</div>
      </div>
      <div className="Leaderboard-entries">
        {top10.map((entry, idx) => (
          <LeaderboardEntry name={entry.name} rank={entry.rank} />
        ))}
      </div>
    </div>
  );
}
