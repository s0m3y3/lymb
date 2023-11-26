import React, { useState, useEffect } from "react";
import {
  Center,
  CardHeader,
  Card,
  CardBody,
  Heading,
  Show,
  Hide,
  Button,
  Flex,
  Input,
  Box,
} from "@chakra-ui/react";

const WorkoutTimer = (props) => {
  // in seconds
  const [workoutTime, setWorkoutTime] = useState(5);
  // in seconds
  const [restTime, setRestTime] = useState(2);
  const [sets, setSets] = useState(2);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(1);
  // Initialize with workoutTime
  const [timer, setTimer] = useState(workoutTime);
  const [isRunning, setIsRunning] = useState(false);
  const [hideElements, setHideElements] = useState(false);
  const numberOfExercises = props.workout.exercises.length;
  console.log(numberOfExercises);

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
              if (currentSet < sets * 2 * numberOfExercises) {
                setCurrentExercise((prevCurrentExercise) =>
                  prevCurrentExercise % numberOfExercises === 0
                    ? 1
                    : prevCurrentExercise + 1
                );
                // Switch to workoutTime
                setTimer(workoutTime);
              } else {
                // All sets completed
                setIsRunning(false);
                // Set timer to 0 to display "finished"
                setTimer(0);
              }
            } else {
              // Workout period
              if (currentSet < sets * 2 * numberOfExercises) {
                setCurrentSet((prevSet) => prevSet + 1);
                // Switch to restTime
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
    setTimer(workoutTime);
    setIsRunning((prevIsRunning) => !prevIsRunning);
    setHideElements((prevHideElement) => !prevHideElement);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentSet(1);
    setCurrentExercise(1);
    // Reset to workoutTime
    setTimer(workoutTime);
  };

  return (
    <Box mb={5} minW={350} maxW={500}>
      {!isRunning && !hideElements && (
        // Conditionally rendering input fields only when the timer is not running
        <Box>
          <Flex mb={4} justifyContent="center">
            <label>
              <Box>Enter Workout Time (seconds):</Box>
              <Input
                name="workoutTime"
                type="number"
                value={workoutTime}
                onChange={(e) => {
                  setWorkoutTime(parseInt(e.target.value));
                  if(e.target.value !== ""){
                  setTimer(parseInt(e.target.value))};
                }}
              />
            </label>
          </Flex>

          <Flex mb={4} justifyContent="center">
            <label>
              <div>Enter Rest Time (seconds):</div>
              <Input
                name="restTime"
                type="number"
                value={restTime}
                onChange={(e) => setRestTime(parseInt(e.target.value))}
              />
            </label>
          </Flex>

          <Flex mb={4} justifyContent="center">
            <label>
              <div>Enter Number of Sets:</div>
              <Input
                nam="setNumber"
                type="number"
                value={sets}
                onChange={(e) => setSets(parseInt(e.target.value))}
              />
            </label>
          </Flex>
        </Box>
      )}

      <Flex justifyContent="center" mb={5}>
        {/* Always visible buttons */}
        <Button mx={2} colorScheme="cyan" onClick={handleStartPause} >
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button
          colorScheme="yellow"
          onClick={() => {
            handleReset();
            setHideElements(false);
          }}
        >
          Reset
        </Button>
      </Flex>
      <Box>
        <Flex justifyContent="center">
          <Heading textAlign={'center'}>
            {timer === 0 && currentSet > sets * 2
              ? "Finished!"
              : (
                <>
                  {props.workout.exercises[currentExercise - 1].name}
                  <Flex justifyContent="center" minW={350} maxW={500}>
                    <span>
                      {`Set ${Math.ceil(currentSet / (2 * numberOfExercises))}:`}
                      {currentSet % 2 === 0 ? "Rest" : "Workout"}
                    </span>
                  </Flex>
                  <Box textColor={"blue"} fontSize={'larger'} color={currentSet % 2 === 0 ? "gray" : "blue"}>
                  {timer} sec
                  </Box>
                </>
              )
            }
          </Heading>
        </Flex>
      </Box>
      {console.log(props.workout.exercises[currentExercise - 1])}
      <Heading as="h2" size="lg" m={3} textAlign="center">
        Exercises
      </Heading>
      {props.workout.exercises.map((exercise,index) =>
        ((Math.ceil(currentSet/(2))-1) % numberOfExercises) === index ? (
          <Card bg="green.500" color="white" key={exercise._id} mb={6}>
            <CardHeader>{exercise.name}</CardHeader>
          </Card>
        ) : (
          <Card key={exercise._id} mb={6}>
            <CardHeader>{exercise.name}</CardHeader>
          </Card>
        )
      )}
    </Box>
  );
};

export default WorkoutTimer;
