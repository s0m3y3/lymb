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
} from "@chakra-ui/react";

const WorkoutTimer = (props) => {
  const [workoutTime, setWorkoutTime] = useState(5); // in seconds
  const [restTime, setRestTime] = useState(2); // in seconds
  const [sets, setSets] = useState(2);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(1);
  const [timer, setTimer] = useState(workoutTime); // Initialize with workoutTime
  const [isRunning, setIsRunning] = useState(false);
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
                setTimer(workoutTime); // Switch to workoutTime
              } else {
                // All sets completed
                setIsRunning(false);
                setTimer(0); // Set timer to 0 to display "finished"
              }
            } else {
              // Workout period
              if (currentSet < sets * 2 * numberOfExercises) {
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
    setCurrentExercise(1);
    setTimer(workoutTime); // Reset to workoutTime
  };

  return (
    <div>
      <fade></fade>
        <Flex mb={4}>
            <label>
              <div>Workout Time (seconds):</div>
              <Input
                type="number"
                value={workoutTime}
                onChange={(e) => setWorkoutTime(parseInt(e.target.value))}
              />
            </label>
          </Flex>

      <Flex mb={4}>
            <label>
              <div>Rest Time (seconds):</div>
              <Input
                type="number"
                value={restTime}
                onChange={(e) => setRestTime(parseInt(e.target.value))}
              />
            </label>
          </Flex>
      
      <Flex mb={4}>
            <label>
              <div>Number of Sets:</div>
              <Input
                type="number"
                value={sets}
                onChange={(e) => setSets(parseInt(e.target.value))}
              />
            </label>
          </Flex>
      
      <div>
        <Button mx={2} colorScheme="cyan" onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button colorScheme="yellow" onClick={handleReset}>Reset</Button>
      </div>
      <div>
     
        <Flex
         
        >
          <Heading>
            {timer === 0 && currentSet > sets * 2
              ? "Finished!"
              : `${props.workout.exercises[currentExercise - 1].name} 
              Set ${Math.ceil(currentSet / (2 * numberOfExercises))}:
              ${currentSet % 2 === 0 ? "Rest" : "Workout"} - ${timer} sec`}
          </Heading>
        </Flex>
      </div>
      {console.log(props.workout.exercises[currentExercise -1])}
      <Heading as="h2" size="lg" mt={4}>
        Exercises
      </Heading>
      {props.workout.exercises.map((exercise) => (
  exercise._id === props.workout.exercises[currentExercise -1]._id ? (
    <Card bg="green.500" color="white" key={exercise._id} mb={6}>
      <CardHeader>{exercise.name}</CardHeader>
    </Card>
  ) : (
    <Card key={exercise._id} mb={6}>
      <CardHeader>{exercise.name}</CardHeader>
    </Card>
  )
))}
    </div>
  );
};

export default WorkoutTimer;
