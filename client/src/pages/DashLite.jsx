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

const DashLite = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Ensure it's an array
  const workouts = userData.workouts || [];
console.log(workouts)
  return (
    <>
      <div>User: {userData.username}</div>
      <div>Email: {userData.email}</div>
      <div>_id: {userData._id}</div>
      {/* <div>exercise: {workouts[0].exercises[0].name}</div> */}
      {workouts?.map((item) => (
        <div key={item._id}>
          {item.name}
          {item.exercises?.map((item2) => (
            <div key={item2._id}>{item2.name}</div>
          ))}
        </div>
      ))}
    </>
  );
};

export default DashLite;
