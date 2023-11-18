import { Container } from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";

export default function Interval() {
  const [num, setNum] = useState(100);
  const [pause, setPause] = useState(false);
  
  let intervalRef = useRef();
  
  const decreaseNum = () => setNum((prev) => prev - 1);

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);
  
  const handleClick = () => {
    if (!pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }
    setPause((prev) => !prev);
  };
  <Container>
  
</Container>
  return (
    <div id="timer">
      <div>{num}</div>
      <button onClick={handleClick}>{pause ? "Start" : "Pause"}</button>
    </div>
  );
}

