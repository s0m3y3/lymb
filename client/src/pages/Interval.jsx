import React, { useState, useEffect } from "react";

import { Center } from "@chakra-ui/react";

const Interval = () => {
  const [workoutTime, setWorkoutTime] = useState(5); // in seconds
  const [restTime, setRestTime] = useState(2); // in seconds
  const [sets, setSets] = useState(2);
  const [currentSet, setCurrentSet] = useState(1);
  const [timer, setTimer] = useState(workoutTime); // Initialize with workoutTime
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) {
            return prevTimer - 1;
          } else {
            // Switch between workout and rest periods
            if (currentSet % 2 === 0) {
              // Rest period
              setCurrentSet((prevSet) => prevSet + 1);

              if (currentSet < sets * 2) {
                setTimer(workoutTime); // Switch to workoutTime
              } else {
                // All sets completed
                setIsRunning(false);
                setTimer(0); // Set timer to 0 to display "finished"
              }
            } else {
              // Workout period
              if (currentSet < sets * 2) {
                setCurrentSet((prevSet) => prevSet + 1);
                setTimer(restTime); // Switch to restTime
              }
            }
            return prevTimer;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timer, currentSet, workoutTime, restTime, sets]);

  const handleStartPause = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentSet(1);
    setTimer(workoutTime); // Reset to workoutTime
  };

  return (
    <Center>
      <div>
        <div>
          <label>
            Workout Time (seconds):
            <input
              type="number"
              value={workoutTime}
              onChange={(e) => setWorkoutTime(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Rest Time (seconds):
            <input
              type="number"
              value={restTime}
              onChange={(e) => setRestTime(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Number of Sets:
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <button onClick={handleStartPause}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div>
          <h2>
            {timer === 0 && currentSet > sets * 2
              ? "Finished!"
              : `Set ${Math.ceil(currentSet / 2)}: ${
                  currentSet % 2 === 0 ? "Rest" : "Workout"
                } - ${timer}s`}
          </h2>
        </div>
      </div>
    </Center>
  );
};

export default Interval;
