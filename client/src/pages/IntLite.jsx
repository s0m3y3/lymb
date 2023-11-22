import React, {useEffect, useState} from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Center, Button, Select, CardHeader, Card, CardBody, Heading } from "@chakra-ui/react";

import { QUERY_EXERCISE, QUERY_ME } from '../utils/queries.js'; // Import your mutations
import { useQuery } from '@apollo/client';


const Interval = () => {
  const [duration, setDuration] = useState(5);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [sets, setSets] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [remainingSets, setRemainingSets] = useState(sets);
  const [check, setCheck] = useState(false);


  //This query now works. Just need to incorporate it into Browser REACT
  const { loading, error, data: exerciseQuery } = useQuery(QUERY_EXERCISE);
  if (loading) {return <h2>Loading...</h2>;}
  if (error) {return <h2>Error! {error.message}</h2>;}
  const exercises = exerciseQuery?.exercises || [];
  // console.log(exercises1);

  const startTimer = () => {
    setCheck(true);
    setRemainingSets(sets);
    setCurrentSet(sets);
    setTimerIsActive(true);
  };

  const renderTime = ({ remainingTime }) => {
    if(setRemainingSets===0){  
      if (remainingTime <= 0) {
        return <div className="timer">FINISHED</div>;
      }
      return (
        <div className="timer">
          <div className="text">Remaining</div>
          <div className="value">{remainingTime}</div>
          <div className="text">seconds</div>
        </div>
      );
    }
    if(setRemainingSets >1){
      if (remainingTime <= 0) {
        return <div className="timer">FINISHED</div>;
      }
      return (
        <div className="timer">
          <div className="text">Remaining</div>
          <div className="value">{remainingTime}</div>
          <div className="text">seconds</div>
        </div>
      );
    }
    ;
  };


  const handleTimerToggle = () => {
    setTimerIsActive((prevValue) => !prevValue);
  };


  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };


  const handleSetChange = (e) => {
    const selectedSets = parseInt(e.target.value);
    setSets(selectedSets);
    setRemainingSets(selectedSets);
    setCurrentSet(1);
  };


  return (
    <Center>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying={timerIsActive}
          duration={duration}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[60, 40, 20, 10]}
          onComplete={() => {
            if (currentSet < sets) {
              setCurrentSet((prevSet) => prevSet + 1);
              setRemainingSets((prevSets) => prevSets - 1);
              return [true, duration]; // Restart the timer for the next set
            }
            return [false, 0]; // Finish the timer when all sets are completed
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
        <br />
        <br />
        <div style={{ display: "flex" }}>
          <Select
            value={duration}
            onChange={handleDurationChange}
            style={{
              marginRight: "20px",
              border: "bold",
              fontSize: "25px",
            }}
          >
            {[5, 10, 20, 30, 40, 50, 60].map((opt) => (
              <option value={opt} key={opt}>
                {opt + " SEC"}
              </option>
            ))}
          </Select>
          <Select
            value={sets}
            onChange={handleSetChange}
            style={{
              marginRight: "20px",
              border: "bold",
              fontSize: "25px",
            }}
          >
            {[1, 2, 3, 4, 5].map((opt) => (
              <option value={opt} key={opt}>
                {opt + " SETS"}
              </option>
            ))}
          </Select>
          <Button
            onClick={handleTimerToggle}
            style={{
              backgroundColor: "teal",
              color: "white",
              border: "none",
              fontSize: "18px",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "6px",
            }}
          >
            {timerIsActive ? "Pause" : "Play"}
          </Button>
        </div>
        <div className="text">Sets Remaining: {remainingSets}</div>

        <Heading as="h2" size="lg" mt={4}>
        Exercise Data
      </Heading>
      {exercises.map((exercise) => (
        <Card key={exercise._id} mb={4}>
          <CardHeader>{exercise.name}</CardHeader>
          <CardBody>
            <p>Description: {exercise.description}</p>
            <p>Type: {exercise.type}</p>
            <p>Target: {exercise.target}</p>
          </CardBody>
        </Card>
      ))}





      </div>
    </Center>
  );
};


export default Interval;


