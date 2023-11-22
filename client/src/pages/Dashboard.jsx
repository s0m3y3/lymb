import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  VStack,
  Wrap,
} from "@chakra-ui/react";

import theme from "../components/theme";
import "@fontsource-variable/lexend-peta";


import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
// import { REMOVE_WORKOUT } from '../utils/mutations';
// import { removeWorkoutId } from '../utils/localStorage';

import Auth from "../utils/auth";


const Dashboard = () => {
//load in logged in user data:
const { loading, data } = useQuery(QUERY_ME);
const userData = data?.me || {};

if (loading) {
  return <h2>Loading...</h2>;
}

// Ensure it's an array
const workouts = userData.workouts || [];
console.log(workouts)


  return (
    <Wrap justify={"space-evenly"}>
      <VStack
        marginY="10px"
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
          ))}       </CardBody>
          <CardFooter></CardFooter>
        </Card>))}
      </VStack>
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
    </Wrap>
  );
};

export default Dashboard;
