import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_SINGLE_WORKOUT } from "../utils/queries";
// import { CREATE_VOTE } from '../utils/mutations';
// import { QUERY_MATCHUPS } from '../utils/queries';

const Paramlite = () => {
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
    <>
      <div>paramlite</div>
      
      {workout.exercises.map((exercise) => (
        <div key={exercise._id}> {exercise.name}</div>
      ))}
    </>
  );
};

export default Paramlite;
