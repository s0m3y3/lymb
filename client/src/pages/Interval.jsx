import { Center } from '@chakra-ui/react'
import React from "react";
import { useState, useEffect } from "react";
// import { useTimer } from 'use-timer';



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
    const [select, setSelect] = React.useState(60);
    // const [start, setStart] = useState(false);
    const [timer, setTimer] = React.useState(0);
    const [check, setCheck] = useState(false);
    const {initialMinute = 0,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
     
  
    const SetlectReset = () => {
        
      let options = [10, 20, 30, 40, 50, 60]
      return (
        <div style={{ display: "flex" }}>
          <select
          
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            style={{
              marginRight: "20px",
              border: "bold",
              fontSize: "25px"
            }}
          >
            {options.map((opt) => (
              <option value={opt} key={opt}>
                {opt + " SEC"}
              </option>
            ))}
          </select>
 
         {check ? (
          <button onClick={()=>setCheck(prevCheck => !prevCheck)}
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
          > Pause </button>
         ) : (
            <button onClick={()=>setCheck(prevCheck => !prevCheck)}
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
              }}> Play </button>

         ) 
         
         
        }
        </div>
      );
    };
    
    return (

   <Center>
        <div className="timer-wrapper" >
          <CountdownCircleTimer
            key={timer}
            isPlaying = {check}
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
      </Center> 
    );
    
  }
  const rootElement = document.getElementById("root");
  ReactDOM.render(<Interval />, rootElement);
  

export default Interval;