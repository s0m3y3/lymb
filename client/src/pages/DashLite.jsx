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
  // if (loading) {
  //   return <h2>LOADING...</h2>;
  // }
console.log(userData)

    return (
      <>
    <div>User : {userData.username}</div>
    <div>Email: {userData.email}</div>
    <div>_id : {userData._id}</div>
    <div>workouts: {JSON.stringify(userData.workouts)}</div>
    </>
    )
};

export default DashLite;
