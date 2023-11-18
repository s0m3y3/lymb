import React from "react";

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// import ReactDOM from "react-dom/client";

const Interval = () => {
    return (
    <h1>
    <CountdownCircleTimer
      isPlaying 
      
      duration={7}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
    >
      {({ remainingTime }) => remainingTime}
      
    </CountdownCircleTimer>

    <button
        type="button"
        onClick={() => setColor("red")}
      >Start</button>
      <br />
        <button
        type="button"
        onClick={() => setColor("red")}
      >Stop</button>
    </h1>
)
}
  

 

export default Interval;