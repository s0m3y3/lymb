import React, { useEffect, useState } from "react";
import Interval from "./Interval.jsx"
import { Center, CardHeader, Card, CardBody, Heading } from "@chakra-ui/react";

import { QUERY_EXERCISE, QUERY_ME } from "../utils/queries.js"; // Import your mutations
import { useQuery } from "@apollo/client";

const ExerciseInterval = () => {
  //This query now works. Just need to incorporate it into Browser REACT
  const { loading, error, data: exerciseQuery } = useQuery(QUERY_EXERCISE);
  // if (loading) {return <h2>Loading...</h2>;}
  // if (error) {return <h2>Error! {error.message}</h2>;}
  const exercises = exerciseQuery?.exercises || [];
  // console.log(exercises1);

  return (
    <Center>
      <div>
      <Interval/>
      </div>
      <div className="timer-wrapper">
        <br />
        <br />
        <div style={{ display: "flex" }}></div>

        <Heading as="h2" size="lg" mt={4}>
          Exercise Data
        </Heading>
        {exercises.map((exercise) => (
          <Card key={exercise._id} mb={4} >
            <CardHeader>{exercise.name}</CardHeader>
          </Card>
        ))}
      </div>
    </Center>
  );
};

export default ExerciseInterval;
