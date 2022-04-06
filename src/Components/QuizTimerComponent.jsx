import React from 'react';
import { useTimer } from 'react-timer-hook';
import "../css/QuizTimerComponent.css"

function QuizTimerComponent({ expiryTimestamp, onTimerExpiry }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => {
      console.warn('onExpire called')
      onTimerExpiry(seconds)
} });


  return (
    <div className="QuizTimerComponentWrapper">
      <div className="TimerQuiz">
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default QuizTimerComponent;