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

import theme from "../components/theme";
import "@fontsource-variable/lexend-peta";

// Imports to create a drag and drop sortable list
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableExercises } from "../components/EditWorkout";
//allow queries 
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const Dashboard = () => {
  //load in queried logged in user data
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>Loading...</h2>;
  }
  // Ensure it's an array
  const workouts = userData.workouts || [];

  const [exercises, setExercises] = useState([
    "Exercise 1",
    "Exercise 2 ",
    "Exercise 3",
  ]);
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
        {workouts.map((item) => (
        <Card w="95%" key={item._id}>
          <CardHeader>
            <Heading as="h3" size="md" color={theme.colors.darkCyan}>
            {item.name}
            </Heading>
          </CardHeader>
          <CardBody>
          {item.exercises.map((item2) => (
            <div key={item2._id}>{item2.name}</div>
          ))}
          </CardBody>
          <CardFooter display="flex" justify="space-between">
            <Button
              bg={theme.colors.darkCyan}
              color={theme.colors.antiFlashWhite}
            >
              Edit
            </Button>
            <Button
              bg={theme.colors.carmine}
              color={theme.colors.antiFlashWhite}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>))}

        <Button>Create Workout</Button>
      </VStack>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Box as={"aside"} bg={theme.colors.timberwolf} minW="30%" h="100%" alignContent={'center'}>
          <Heading>Workout Name</Heading>
          <Button
            bg={theme.colors.darkCyan}
            color={theme.colors.antiFlashWhite}
          >
            Add Exercises
          </Button>
          <SortableContext
            items={exercises}
            strategy={verticalListSortingStrategy}
          >
            {exercises.map((exercise) => (
              <SortableExercises key={exercise} id={exercise} />
            ))}
          </SortableContext>
        </Box>
      </DndContext>

    </Wrap>
  );
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setExercises((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);

        arrayMove(items, activeIndex, overIndex);
      });
    }
  }
};

export default Dashboard;
  {/* Code for a recent exercises feature that would be a future development */}
  {/* <VStack
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
  </VStack> */}
