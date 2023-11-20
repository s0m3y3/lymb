import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Center, Button, Container, Stack, Select } from "@chakra-ui/react";

const Interval = () => {
  const [workoutTime, setWorkoutTime] = useState(5); // in seconds
  const [restTime, setRestTime] = useState(2); // in seconds
  const [sets, setSets] = useState(5);
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

  const handleInputChange = (value, setter) => {
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      setter(parsedValue);
    }
  };

  const handleSelectChange = (value) => {
    setSets(parseInt(value));
  };

  return (
    <Container>
      <Center>
        <Stack spacing={4}>
          <div>
            <label>
              Workout Time (seconds):
              <input
                type="number"
                value={workoutTime}
                onChange={(e) => handleInputChange(e.target.value, setWorkoutTime)}
              />
            </label>
          </div>
          <div>
            <label>
              Rest Time (seconds):
              <input
                type="number"
                value={restTime}
                onChange={(e) => handleInputChange(e.target.value, setRestTime)}
              />
            </label>
          </div>
          <div>
            <label>
              Number of Sets:
              <Select value={sets.toString()} onChange={(e) => handleSelectChange(e.target.value)}>
                {[1, 2, 3, 4, 5].map((option) => (
                  <option key={option} value={option.toString()}>
                    {option}
                  </option>
                ))}
              </Select>
            </label>
          </div>
          <div>
            <Button colorScheme="teal" variant="outline" onClick={handleStartPause}>
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button colorScheme="teal" variant="outline" onClick={handleReset}>
              Reset
            </Button>
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
        </Stack>
      </Center>
    </Container>
  );
};

export default Interval;
