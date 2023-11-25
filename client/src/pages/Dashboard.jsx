import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import theme from "../components/theme";
import "@fontsource-variable/lexend-peta";
import { UPDATE_WORKOUT } from "../utils/mutations.js";

// Imports to create a drag and drop sortable list
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableExercise } from "../components/SortableExercise";
//allow queries
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const Dashboard = () => {
  const [updateWorkout, { error }] = useMutation(UPDATE_WORKOUT);

  const [exercises, setExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutId, setWorkoutId] = useState("");
  const [editElements, populateEditElements] = useState("");
  //load in queried logged in user data
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  // console.log(userData);
  // Ensure it's an array
  const workouts = userData.workouts || [];
  if (loading) {
    return <Heading size="sm">Loading...</Heading>;
  }
  // console.log(workouts);
  const handleUpdateWorkout = async (workoutid, exerciseid) => {
    try {
      const { data } = await updateWorkout({
        variables: { input: { _id: workoutid, exercises: exerciseid } },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrap justify={"space-evenly"} py={10}>
      <VStack
        py="10px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        minW="50%"
        bg={theme.colors.timberwolf}
      >
        <Heading
          as="h2"
          size="lg"
          color={theme.colors.outerSpace}
          fontFamily={theme.fonts.heading}
        >
          My Workouts
        </Heading>
        {workouts.map((workout, index) => (
          <Card w="95%" key={`ex1-${index}`}>
            <CardHeader>
              <Heading as="h3" size="md" color={theme.colors.darkCyan}>
                {workout.name}
              </Heading>
            </CardHeader>
            <CardBody>
              {workout.exercises.map((exercise, index) => (
                <div key={`ex2-${index}`}>{exercise.name}</div>
              ))}
            </CardBody>
            <CardFooter display="flex" justify="space-between">
              <Button
                bg={theme.colors.darkCyan}
                color={theme.colors.antiFlashWhite}
                onClick={() => {
                  setExercises(workout.exercises.map((exercise) => exercise));
                  setWorkoutName(workout.name);
                  // populateEditElements(<></>);
                  setWorkoutId(workout._id);
                }}
              >
                Edit
              </Button>
              <Button
                bg={theme.colors.carmine}
                color={theme.colors.antiFlashWhite}
              >
                Delete
              </Button>
              <Button
                as={Link}
                to={`/intLite/${workout._id}`}
                bg={theme.colors.carmine}
                color={theme.colors.antiFlashWhite}
              >
                Start
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Button>Create Workout</Button>
      </VStack>
      <Box
        as={"aside"}
        bg={theme.colors.timberwolf}
        minW="30%"
        h="100%"
        alignContent={"center"}
        // padding={0}
      >
        <Heading marginX={3}>{workoutName}</Heading>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={exercises.map((exercise) => exercise._id)}
            strategy={verticalListSortingStrategy}
          >
            {exercises.map((exercise, index) => (
              <SortableExercise
                key={`ex-${index}`}
                id={exercise._id}
                name={exercise.name}
              />
            ))}
          </SortableContext>
          <Heading marginX={3} size="sm">
            To add exercises, vist the browse page
          </Heading>
          <Button
            margin={5}
            bg={theme.colors.darkCyan}
            color={theme.colors.antiFlashWhite}
            onClick={() => {
              handleUpdateWorkout(
                workoutId,
                exercises.map((exercise) => exercise._id)
              );
              refetch();
            }}
          >
            save
          </Button>
        </DndContext>
      </Box>
    </Wrap>
  );
  function handleDragEnd(event) {
    // console.log("Drag end called");
    const { active, over } = event;
    // console.log("ACTIVE: " + active.id);
    // console.log("OVER: " + over.id);
    if (active.id !== over.id) {
      setExercises((items) => {
        console.log(items);
        const activeIndex = items.findIndex(
          (exercise) => exercise._id === active.id
        );
        const overIndex = items.findIndex(
          (exercise) => exercise._id === over.id
        );

        const resortedExercises = arrayMove(items, activeIndex, overIndex);

        return resortedExercises;
      });
    }
    console.log(exercises);
  }
};

export default Dashboard;

{
  /* Code for a recent exercises feature that would be a future development */
}
{
  /* <VStack
    py="10px"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    minW="35%"
    bg={theme.colors.timberwolf}
  >
    <Heading
      as="h2"
      size="lg"
      color={theme.colors.outerSpace}
      fontFamily={theme.fonts.heading}
    >
      Recent Exercises
    </Heading>
    <Card w="95%">
      <CardHeader>
        <Heading as="h3" size="md" color={theme.colors.darkCyan}>
          Full Body
        </Heading>
      </CardHeader>
      <CardBody>
        I'm typing stuff in here to test some spacing issues
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
    <Card w="95%">
      <CardHeader>
        <Heading as="h3" size="md" color={theme.colors.darkCyan}>
          Full Body
        </Heading>
      </CardHeader>
      <CardBody></CardBody>
      <CardFooter></CardFooter>
    </Card>
    <Card w="95%">
      <CardHeader>Cardio</CardHeader>
      <CardBody></CardBody>
      <CardFooter></CardFooter>
    </Card>
  </VStack> */
}
