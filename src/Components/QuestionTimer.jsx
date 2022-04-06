import React from 'react';
import { useTimer } from 'react-timer-hook';

function QuestionTimer({ expiryTimestamp, onTimerExpiry }) {
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
    <div className="time">
      <div>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default QuestionTimer;