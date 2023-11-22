import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Heading,
  Input,
  InputLeftAddon,
  Image,
  SimpleGrid,
  Container,
  InputGroup,
  InputRightAddon,
  Wrap,
} from "@chakra-ui/react";

import theme from "../components/theme";
import "@fontsource-variable/lexend-peta";
import { useQuery } from '@apollo/client';

import { QUERY_EXERCISE, QUERY_ME } from '../utils/queries.js'; // Import your mutations
import React, {useEffect, useState} from 'react';

import exerciseDataJson from '../utils/testing.json'; //testing purpose ONLY -> WILL need to replace this import with actual query.
import typeData from '../utils/browseType.json'; //Used for "Browse by Type" section for name & image source. 

//Keep all imported images (png) below. They are being used indirectly, until I find a better way to condense them. 
import strengthLogo from "../assets/dumbbell.png"
import cardioLogo from "../assets/cardio.png"
import stretchLogo from "../assets/stretch.png"
import coreLogo from "../assets/core.png"

const Browse = () => {
  //TODO: Figure out this query exercise. It does not work. Once work, then replace "exerciseDataJson"
  // const { data, loading, error } = useQuery(QUERY_EXERCISE);
  // const exercises = data?.exercises || {};

  //Example of WORKOUT that works. It just need authorization on server side. 
  // const { loading, data } = useQuery(QUERY_ME);
  // const userData = data?.me || {};

  // console.log("hi")
  // console.log(userData)
  // console.log(exercises)

// This is for collapse toggle. Currently does not work. 
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

//This filter exercise data, based on OnClick for Browse-Type. 
   //NOTE to self: query from graphql, should filter the data already. It may look diff, but similar to code below. 
  const [selectedType, setSelectedType] = useState(''); //Browse-Type that the user selects.
  const [exerciseData, setExerciseData] = useState([]); //modified exercisedata to be displayed in results
  //On page loading, it sets default to exerciseDataJson OR all exercises. 
  useEffect(() => {setExerciseData(exerciseDataJson);}, []);

  const handleTypeClick = (type) => {
    //logic: check previous type, if equal to type, then set it to blank. Otherwise, set to type. 
    setSelectedType(prevType => (prevType === type ? '' : type));
  
    // Filter exerciseData based on type clicked
    const filteredExercises = exerciseDataJson.filter(exercise => {
      const types = exercise.type.split(',').map(t => t.trim());
      return types.includes(type);
    });
  
    // If type is blank from above logic, reset to default data to exerciseDataJson - show all exercise data
    if (selectedType === type || !type) {
      setExerciseData(exerciseDataJson);
    } else {
      setExerciseData(filteredExercises);
    }
  };

  //Searchbar filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTerm(searchText);

    const filteredData = exerciseDataJson.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchText)
    );
    setFilteredExercises(filteredData);
  };

  return (
    <Container maxW="100%">
      {/* <Box my={10}>
        <InputGroup>
          <InputLeftAddon fontFamily={theme.fonts.heading} as="h2" size="md">
            Search Exercises
          </InputLeftAddon>
          <Input
            size="md"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Enter exercise name"
          />
          <InputRightAddon>
            <Button>Search</Button>
          </InputRightAddon>
        </InputGroup>
      </Box> */}

{/* collapse bar in testing... not there yet. */}
    <>
      <Button onClick={handleToggle}>
        Toggle
      </Button>
      <Collapse mt={4} isOpen={show}>
        {/* Add content to display inside the Collapse */}
        <p>Some collapsible content...</p>
      </Collapse>
    </>

{/*Browse Type Section */}
    <Box my={10} display="flex" flexDirection={'column'}>
      <Heading mb={5} alignSelf='center' fontFamily={theme.fonts.heading} as="h2" size="md">
        Browse by Type
      </Heading>
      <Wrap justify={"space-evenly"}>
        {/* Maps through browseType, to populate the cards TYPE. */}
        {typeData.map((data, index) => (
          <Card
            key={`type-${index}`}
            width={150}
            textAlign="center"
            alignSelf="center"
            onClick={() => handleTypeClick(data.type)}
            _hover={{
              bg: "gray.200",
              cursor: "pointer",
            }}
            bg={selectedType === data.type ? "gray.200" : "white"} // Apply conditional bg color
          >
            <CardHeader>
              <Heading color={theme.colors.darkCyan} as="h3" size="sm">
                <Image src={eval(data.image)} alt={`${data.type}-photo`} />
              </Heading>
            </CardHeader>
            <CardBody fontWeight="bold" fontSize="large">
              {data.type}
            </CardBody>
          </Card>
        ))}
      </Wrap>
    </Box>

{/* Exercise Section */}
      <Box my={10} display='flex' flexDirection={'column'}>
        <Heading mb={5} alignSelf='center' fontFamily={theme.fonts.heading} as="h2" size="md">
          Results
        </Heading>
        <SimpleGrid spacing={10} minChildWidth={300} textAlign="center">
  {/* Maps through exerciseData (includes filtering), to populate the cards. */}
        {/* The commented-OUT code below was my attempt to filter by searchbar. It did not work, but may be useful. */}
        {/* {(filteredExercises.length > 0 ? filteredExercises : exerciseDataJson).map((exercise, index) =>( */}
            {exerciseData.map((exercise, index) => (
            <Card key={exercise.id}>
              <CardHeader fontWeight="bold" fontSize="large">{exercise.name}</CardHeader>
              <CardBody>{exercise.description}</CardBody>
              <CardBody>
                Type: {exercise.type}
                <br />
                Targets: {exercise.target}</CardBody>
            </Card>
            ))}
        </SimpleGrid>
      </Box>

    </Container>
  );
};

export default Browse;