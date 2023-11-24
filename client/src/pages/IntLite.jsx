import React, { useEffect, useState } from "react";
import Interval from "./Interval.jsx"
import { Center, CardHeader, Card, CardBody, Heading, Show, Hide } from "@chakra-ui/react";

import { QUERY_EXERCISE, QUERY_ME } from "../utils/queries.js"; // Import your mutations
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_SINGLE_WORKOUT } from "../utils/queries";


const ExerciseInterval = () => {
  
  //This query now works. Just need to incorporate it into Browser REACT
  // const { loading, error, data: exerciseQuery } = useQuery(QUERY_EXERCISE);
  // if (loading) {return <h2>Loading...</h2>;}
  // if (error) {return <h2>Error! {error.message}</h2>;}
  // const exercises = exerciseQuery?.exercises || [];
  // console.log(exercises1);
  let { workoutId } = useParams();
  const { loading, data, error } = useQuery(QUERY_SINGLE_WORKOUT, {
    variables: { _id: workoutId },
  });

  const workout = data?.workout || [];

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading data</div>;
  }

  console.log(workout);
  console.log(workoutId);



  return (
    <Center>
      <div>
      <Interval workout={workout}/>
      </div>
      
      <div className="timer-wrapper">
        <br />
        <br />
        <div style={{ display: "flex" }}></div>

        <Heading as="h2" size="lg" mt={4}>
          Exercise Data
        </Heading>
        {workout.exercises.map((exercise) => (
          <Card key={exercise._id} mb={6} >
            <CardHeader>{exercise.name}</CardHeader>
          </Card>
        ))}
      </div>
    </Center>
  );
  
};

export default ExerciseInterval;
