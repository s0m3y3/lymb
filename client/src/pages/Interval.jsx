
import { Center } from "@chakra-ui/react";
import React from "react";

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ReactDOM from "react-dom";

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">FINISHED</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

function Interval() {
    const [select, setSelect] = React.useState(10);
    const [timer, setTimer] = React.useState(0);
  
    const SetlectReset = () => {
      let options = [10, 20, 30, 40, 50, 60];
      return (
        <div style={{ display: "flex" }}>
          <select
          
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            style={{
              marginRight: "20px",
              backgroundColor: "honeydew",
              border: "none",
              fontSize: "20px"
            }}
          >
            {options.map((opt) => (
              <option value={opt} key={opt}>
                {opt + " sec"}
              </option>
            ))}
          </select>
          <button
          
            className="reset"
            onClick={() => setTimer((prevTimer) => prevTimer + 1)}
            style={{
            
              marginLeft: "20px",
              backgroundColor: "teal",
              color: "white",
              border: "none",
              fontSize: "18px",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "6px"
            }}
          >
            Reset
          </button>
        </div>
      );
    };
  
    return (
   
        <div className="timer-wrapper center" >
          <CountdownCircleTimer
            key={timer}
            isPlaying
            duration={select}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[60, 40, 20, 10]}
            onComplete={() => [false, 1000]}
          >
            {renderTime}
          </CountdownCircleTimer>
          <br />
          <br />
          <SetlectReset />
        
          
        </div>
      
    );
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<Interval />, rootElement);
  









// const Interval = () => {
//     return (
//     <h1>
//     <CountdownCircleTimer
//       isPlaying 
//       duration={30}
//       colors={['#004777', '#F7B801', '#A30000', '#A30000']}
//       colorsTime={[30, 20, 10, 0]}
//     >
//       {({ remainingTime }) => remainingTime}
      
//     </CountdownCircleTimer>

//     <button
//         type="button"
//         onClick={() => setColor("red")}
//       >Start</button>
//       <br />
//         <button
//         type="button"
//         onClick={() => setColor("red")}
//       >Stop</button>
//     </h1>
// )

// }
  


export default Interval;