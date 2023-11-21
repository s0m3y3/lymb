import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, CardFooter } from "@chakra-ui/react";
function ListExercises(props) {
  return (
    <ul>
      {/* Here we map over each grocery item and return a new array of `li` elements that contains the grocery name */}
      {/* When using map you must provide a unique key attribute to each item. Ours is `item.id` */}
      {props.exercises.map((item) => (
        <div>
        {item.name}
        </div>
      ))}
    </ul>
  );
}

export default ListExercises;
