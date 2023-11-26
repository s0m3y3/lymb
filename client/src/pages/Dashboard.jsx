import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Flex,
  Spacer,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import theme from "../components/theme";
import "@fontsource-variable/lexend-peta";
import {
  UPDATE_WORKOUT,
  DELETE_WORKOUT,
  CREATE_WORKOUT,
} from "../utils/mutations.js";

// Imports to create a drag and drop sortable list
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { SortableExercise } from "../components/SortableExercise";
//allow queries
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const Dashboard = () => {
  const [updateWorkout, { error }] = useMutation(UPDATE_WORKOUT);
  const [deleteWorkout, { errorDelete }] = useMutation(DELETE_WORKOUT);
  const [createWorkout, { errorCreate }] = useMutation(CREATE_WORKOUT);

  const [exercises, setExercises] = useState([]);
  const [disallowSort, toggleSort] = useState(true);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutId, setWorkoutId] = useState("");
  const [thisWorkout, setThisWorkout] = useState({});
  const [hideElements, toggleHideElements] = useState(true);
  const [hideX, toggleHideX] = useState(true);
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  // console.log(userData);
  // Ensure it's an array
  const workouts = userData.workouts || [];
  if (loading) {
    return <Heading size="sm">Loading...</Heading>;
  }
  console.log(workouts);
  const handleUpdateWorkout = async (workoutid, exerciseid) => {
    try {
      const { data } = await updateWorkout({
        variables: { input: { _id: workoutid, exercises: exerciseid } },
      });
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };
  // Function for delete workout on delete button click
  const handleDeleteWorkout = async (workoutid) => {
    try {
      const { data } = await deleteWorkout({
        variables: { input: { _id: workoutid } },
      });
      await refetch();
    } catch (meoutside) {
      console.error(meoutside);
    }
  };
  // Function to create a workout when clicking "create workout" button
  const handleCreateWorkout = async (newName, newDescription) => {
    try {
      const { data } = await createWorkout({
        variables: { input: { name: newName, description: newDescription } },
      });
      await refetch();
    } catch (acold) {
      console.error(acold);
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
              <Heading size="md" color={theme.colors.darkCyan}>
                {workout.name}
              </Heading>

              <Heading size="sm">{workout.description}</Heading>
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
                  setThisWorkout(workout);
                  toggleHideElements(false);
                }}
              >
                Edit
              </Button>

              <Button
                bg={theme.colors.carmine}
                color={theme.colors.antiFlashWhite}
                onClick={() => {
                  handleDeleteWorkout(workout._id);
                  
                }}
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

        <Button
          onClick={() => {
            handleCreateWorkout(
              "Click edit to enter a workout name.",
              "Click edit to enter a description of workout."
            );
            // refetch()
          }}
        >
          Create Workout
        </Button>
      </VStack>

      {!hideElements &&
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
          {disallowSort ? (
            <>
              {thisWorkout?.exercises?.map((exercise, index) => (
                <Card m={3} key={`ex3-${index}`} borderColor={'red.200'}>
                  <Flex>
                    <CardBody>
                      <div >{exercise.name}</div>
                    </CardBody>
                    <Spacer />
                    {!hideX && (
                      <Button
                        onClick={(e) => {
                          exercises.splice(
                            exercises.findIndex(
                              (item) => item._id == exercise._id
                            ),
                            1
                          );
                        }}
                      >
                        x
                      </Button>
                    )}
                  </Flex>
                </Card>
              ))}
              {hideX && <Button
              hidden={hideElements}
                margin={3}
                onClick={() => {
                  toggleSort(false);
                  toggleHideX(true);
                }}
              >
                Sort Exercises
              </Button>}
              {hideX && <Button
              hidden={hideElements}
                margin={3}
                onClick={() => {
                  toggleSort(true);
                  toggleHideX(false);
                }}
              >
                Delete Exercises
              </Button>}
              {!hideX && <Button
              hidden={hideElements}
                margin={3}
                onClick={() => {
                  toggleSort(true);
                  toggleHideX(true);
                  setExercises(
                    thisWorkout?.exercises?.map((exercise) => exercise)
                  );
                }}
              >
                Cancel Delete Exercises
              </Button>}
            </>
          ) : (
            <>
              <SortableContext
              
                items={exercises.map(
                  (exercise, index) => `${exercise._id}-${index}`
                )}
                strategy={verticalListSortingStrategy}
              >
                {exercises.map((exercise, index) => (
                  <SortableExercise
                    key={`ex-${index}`}
                    id={`${exercise._id}-${index}`}
                    name={exercise.name}
                  />
                ))}
              </SortableContext>
              <Button
                hidden={hideElements}
                marginX={3}
                onClick={() => {
                  toggleSort(true);
                  setExercises(
                    thisWorkout?.exercises?.map((exercise) => exercise)
                  );
                  toggleHideX(true);
                }}
              >
                Cancel Sort
              </Button>
            </>
          )}
          <Heading margin={3} size="sm" hidden={hideElements}>
            To add exercises, vist the browse page
          </Heading>
          <Button
            hidden={hideElements}
            margin={5}
            bg={theme.colors.darkCyan}
            color={theme.colors.antiFlashWhite}
            onClick={() => {
              handleUpdateWorkout(
                workoutId,
                exercises.map((exercise) => exercise._id)
              );
              console.log(thisWorkout);
              toggleSort(true);
              toggleHideX(true)
              toggleHideElements(true)
            }}
          >
            save
          </Button>
        </DndContext>
      </Box>}
    </Wrap>
  );
  function handleDragEnd(event) {
    // console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER: " + over.id);
    // if (active.id !== over.id) {
    toggleHideElements(false);
    setExercises((items) => {
      console.log(items);
      const activeIndex = items.findIndex(
        (exercise, index) => `${exercise._id}-${index}` === active.id
      );
      const overIndex = items.findIndex(
        (exercise, index) => `${exercise._id}-${index}` === over.id
      );

      const resortedExercises = arrayMove(items, activeIndex, overIndex);

      return resortedExercises;
    });
    // }
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
