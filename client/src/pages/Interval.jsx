import React, { useState, useEffect } from "react";

import { Center, Button, Container, Stack, Select } from "@chakra-ui/react";

const Interval = () => {
  const [workoutTimeOptions] = useState([5, 30, 60, 90, 120]);
  const [restTimeOptions] = useState([3, 5, 7, 9, 11]);
  const [selectedWorkoutTime, setSelectedWorkoutTime] = useState(workoutTimeOptions[0]);
  const [selectedRestTime, setSelectedRestTime] = useState(restTimeOptions[0]);
  const [workoutTime, setWorkoutTime] = useState(selectedWorkoutTime);
  const [restTime, setRestTime] = useState(selectedRestTime);
  const [sets, setSets] = useState(5);
  const [currentSet, setCurrentSet] = useState(1);
  const [timer, setTimer] = useState(workoutTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) {
            return prevTimer - 1;
          } else {
            if (currentSet % 2 === 0) {
              setCurrentSet((prevSet) => prevSet + 1);

              if (currentSet < sets * 2) {
                setTimer(workoutTime);
              } else {
                setIsRunning(false);
                setTimer(0);
              }
            } else {
              if (currentSet < sets * 2) {
                setCurrentSet((prevSet) => prevSet + 1);
                setTimer(restTime);
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
    if (!isRunning) {
      setWorkoutTime(selectedWorkoutTime);
      setRestTime(selectedRestTime);
      setCurrentSet(1);
      setTimer(selectedWorkoutTime);
    }
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentSet(1);
    setTimer(selectedWorkoutTime);
  };

  const handleInputChange = (value, setter, setSelectedSetter) => {
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      setSelectedSetter(parsedValue);
    }
  };

  const handleSelectChange = (value, setter, setSelectedSetter) => {
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      setSelectedSetter(parsedValue);
    }
  };

  return (
    <Container>
      <Center>
        <Stack spacing={4}>
          <div>
            <label>
              Workout Time (seconds):
              <Select value={selectedWorkoutTime.toString()} onChange={(e) => handleSelectChange(e.target.value, setWorkoutTime, setSelectedWorkoutTime)}>
                {workoutTimeOptions.map((option) => (
                  <option key={option} value={option.toString()}>
                    {option}
                  </option>
                ))}
              </Select>
            </label>
            <p>Selected Workout Time: {selectedWorkoutTime}s</p>
          </div>
          <div>
            <label>
              Rest Time (seconds):
              <Select value={selectedRestTime.toString()} onChange={(e) => handleSelectChange(e.target.value, setRestTime, setSelectedRestTime)}>
                {restTimeOptions.map((option) => (
                  <option key={option} value={option.toString()}>
                    {option}
                  </option>
                ))}
              </Select>
            </label>
            <p>Selected Rest Time: {selectedRestTime}s</p>
          </div>
          <div>
            <label>
              Number of Sets:
              <Select value={sets.toString()} onChange={(e) => handleSelectChange(e.target.value, setSets, setSets)}>
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
          <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '5px solid #3498db',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
          }}>
 
        {timer}
          </div>
        </Stack>
      </Center>
    </Container>
  );
};

export default Interval;
