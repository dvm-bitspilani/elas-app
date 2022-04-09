import React from 'react';
import LeaderboardContainer from '../Components/LeaderboardContainer.jsx'
import { useEffect, useState } from "react";

export default function PrelimsLeaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [top10, setTop10] = useState([]);
  //       const leaders = [
  //     {
  //       name: "Will Smith",
  //       rank: 1,
  //       color: "#FFF504",
  //       img: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-04/will-smith-lc-main-220401-9ac255.jpg",
  //     },
  //     {
  //       name: "Will Smith",
  //       rank: 2,
  //       color: "#4DE9FD",
  //       img: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-04/will-smith-lc-main-220401-9ac255.jpg",
  //     },
  //     {
  //       name: "Will Smith",
  //       rank: 3,
  //       color: "#FF9DFA",
  //       img: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-04/will-smith-lc-main-220401-9ac255.jpg",
  //     },
  //   ];

  //   const top10 = [
  //     { name: "Ankush Jain", rank: 4 },
  //     { name: "Ankush Jain", rank: 5 },
  //     { name: "Ankush Jain", rank: 6 },
  //     { name: "Ankush Jain", rank: 7 },
  //     { name: "Ankush Jain", rank: 8 },
  //     { name: "Ankush Jain", rank: 9 },
  //     { name: "Ankush Jain", rank: 10 },
  //   ];


  useEffect(() => {
    (async () => {
      const body = {
        question_id: localStorage.getItem('question_id'),
      }
      await fetch("https://bits-apogee.org/elasquiz/get_prelims_leaderboard/", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
        mode: "cors",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.error) {
            // alert(result.error);
            console.log(result.error);
          }
          else {
            var temp = result;
            if(temp.length>=3){
              for (var i = 0; i < 3; i++) {
                if (i === 0) {
                  temp[i].color = "#FFF504";
                }
                if (i === 1) {
                  temp[i].color = "#4DE9FD";
                }
                if (i === 2) {
                  temp[i].color = "#FF9DFA";
                }
              }
            }
            if(temp.length ===1){
              temp[0].color = "#FFF504"
            }
            if(temp.length ===2){
              temp[0].color = "#FFF504";
              temp[1].color = "#4DE9FD"
            }
            for (var i = 0; i < temp.length; i++) {
              temp[i].name = temp[i].member;
              temp[i].rank = i + 1;
            }
            const tempLeaders = temp.splice(0, 3);
            setLeaders(tempLeaders);
            setTop10(temp);
          }
        })
        .catch((err) => {
          console.log(err);
          var temp = [
            {
              name: "Will Smith",
            },
            {
              name: "Will Smith",
            },
            {
              name: "Will Smith",
            },
            { name: "Ankush Jain" },
            { name: "Ankush Jain" },
            { name: "Ankush Jain" },
            { name: "Ankush Jain" },
            { name: "Ankush Jain" },
            { name: "Ankush Jain" },
            { name: "Ankush Jain" },
          ];
          for (var i = 0; i < 3; i++) {
            if (i === 0) {
              temp[i].color = "#FFF504";
            }
            if (i === 1) {
              temp[i].color = "#4DE9FD";
            }
            if (i === 2) {
              temp[i].color = "#FF9DFA";
            }
          }
          for (var j = 0; j < temp.length; j++) {
            // temp[i].name = temp[i].member;
            temp[j].rank = j + 1;
          }
          const tempLeaders = temp.splice(0, 3);
          setLeaders(tempLeaders);
          setTop10(temp);



        });

    })()

  }, [])

  return (
    <div className="PrelimsLeaderboardWrapper">
      <LeaderboardContainer heading="Prelims Leaderboard" leaders={leaders} top10={top10} />
    </div>)
}