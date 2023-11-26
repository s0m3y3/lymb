import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Container,
  VStack,
  Wrap,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import {
  UPDATE_WORKOUT,
  DELETE_WORKOUT,
  CREATE_WORKOUT,
} from "../utils/mutations.js";
import { HamburgerIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Auth from "../utils/auth";
import AddToWorkoutModal from "../components/AddToWorkoutModal.jsx";
import theme from "../components/theme";
import "@fontsource-variable/lexend-peta"; //font theme. 
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EXERCISE, QUERY_WORKOUT} from '../utils/queries.js'; 
import React, {useEffect, useState} from 'react';
import getBrowseData from '../utils/browserImport.js' //Generates images and name for "Browse By Type"

const Browse = () => {
//Function from import. Helps, generates images and name for "Browse By Type"
  const typeData = getBrowseData();
  const {loading, data, error } = useQuery(QUERY_EXERCISE);
  const exerciseDataJson = data?.exercises || [];

  const {loading: workoutLoading, data: workoutData, error: workoutError } = useQuery(QUERY_WORKOUT);
  const WorkoutDataJson = workoutData?.workouts || [];
  // console.log(WorkoutDataJson)

  const [selectedType, setSelectedType] = useState(''); //Browse-Type that the user selects.
  const [exerciseData, setExerciseData] = useState(exerciseDataJson); //modified exercisedata to be displayed in results
  const [exerciseId, setExerciseId] = useState('');
  ///////////////////////////////////////////////  
  //modal state and functions for open and close
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
 //end modal state and functions for open and close
 ////////////////////////////////////////////////// 
 
// Update exerciseData state when data changes; ALSO, loads exercise list when refreshing or loading Browse for the first time.
useEffect(() => {if (data) {setExerciseData(data.exercises || []);}}, [data]);
 
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

  // This is for Collapsible button of "Browse by Workout".
  const [showWorkouts, setShowWorkouts] = useState(true); // State to control visibility of workouts
  const handleToggleWorkouts = () => {
    setShowWorkouts(!showWorkouts); // Toggle show/hide on hamburger icon click
  };
  const addWorkout = (addId)=>{
    console.log(addId)  
  }

  // This is for Collapsible button of "Browse by Type".
  const [showType, setShowType] = useState(true); // State to control visibility of workouts
  const handleToggleType = () => {
    setShowType(!showType); // Toggle show/hide on hamburger icon click
  };

  // This is for Collapsible button of "Results".
  const [showResults, setShowResults] = useState(true); // State to control visibility of workouts
  const handleToggleResults = () => {
    setShowResults(!showResults); // Toggle show/hide on hamburger icon click
  };
    
  return (
    <Container maxW="100%">

{/*Browse Type Section */}
    <Box my={10} display="flex" flexDirection={'column'}>

{/* Browse by Workout */}
    <Heading mb={5} alignSelf='center' fontFamily={theme.fonts.heading} as="h2" size="md">
      Browse by Workout
        <IconButton
          ml={5}
          icon={showWorkouts ? <ChevronUpIcon /> : <HamburgerIcon />}
          aria-label="Toggle workouts"
          onClick={handleToggleWorkouts}
        />
    </Heading>
    {/* showWorkout below collapse this entire field */}
    {showWorkouts && ( <> 
      <Flex overflowX="auto" mb={5}>
      {WorkoutDataJson.map((workout, index) => (
        <Card key={index} m={2} w="150px" h="150px" minW="200px" minH="150px" maxW="200px" maxH="150px">
          <CardHeader fontWeight="bold" fontSize="large">
            {workout.name.length > 40 ? `${workout.name.substring(0, 40)}...` : workout.name}
          </CardHeader>
          <VStack flex={1} justify="flex-end" alignItems="flex-start">
                    <Button
                      minH="40px"
                      minW="200px"
                      onClick={()=>addWorkout(workout.id)}
                    >Click to add
                    </Button>
          </VStack>
        </Card>
        ))}
      </Flex>
      </>
    )}

      <Heading mb={5} alignSelf='center' fontFamily={theme.fonts.heading} as="h2" size="md">
        Browse by Type
          <IconButton
            ml={5}
            icon={showType ? <ChevronUpIcon /> : <HamburgerIcon />}
            aria-label="Toggle Type"
            onClick={handleToggleType}
          />
      </Heading>
      <Wrap justify={"space-evenly"}>
        {/* Maps through browseType, to populate the cards TYPE. */}
        {showType && ( <> 
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
                <Image src={data.image} alt={`${data.type}-photo`} />
              </Heading>
            </CardHeader>
            <CardBody fontWeight="bold" fontSize="large">
              {data.type}
            </CardBody>
          </Card>
          ))}
         </>
        )}
      </Wrap>
    </Box>

{/* Exercise Section */}
      <Box my={10} display='flex' flexDirection={'column'}>
        <Heading mb={5} alignSelf='center' fontFamily={theme.fonts.heading} as="h2" size="md">
          Results
          <IconButton
            ml={5}
            icon={showResults ? <ChevronUpIcon /> : <HamburgerIcon />}
            aria-label="Toggle Results"
            onClick={handleToggleResults}
          />
        </Heading>
        <SimpleGrid spacing={10} minChildWidth={300} textAlign="center">
  {/* Maps through exerciseData (includes filtering), to populate the cards. */}
          {showResults && ( <> 
              {exerciseData.map((exercise, index) => (
              <Card key={exercise._id}>
                <CardHeader fontWeight="bold" fontSize="large">{exercise.name}</CardHeader>
                <CardBody>{exercise.description}</CardBody>
                <CardBody>
                  Type: {exercise.type}
                  <br />
                  Targets: {exercise.target}</CardBody>
                  <Button onClick={()=>{
                    handleModalOpen();
                    setExerciseId(exercise._id);
                    // console.log(`exercise id is: ${exerciseId}`)
                    }}>Click to add</Button>
              </Card>
              ))}
              </>
          )}
          </SimpleGrid>
      </Box>
      {/* using AddToWorkoutModal component. exerciseId is passed as props to the component
      so we know which exercise to save to the workout the user chooses */}
      <AddToWorkoutModal isOpen={isModalOpen} onClose={handleModalClose} exerciseId={exerciseId} />

    </Container>
  );
};

export default Browse;


// Future Implementation. Search-Bar */}
// <Box my={10}>
//   <InputGroup>
//     <InputLeftAddon fontFamily={theme.fonts.heading} as="h2" size="md">
//       Search Exercises
//     </InputLeftAddon>
//     <Input
//       size="md"
//       value={searchTerm}
//       onChange={handleSearch}
//       placeholder="Enter exercise name"
//     />
//     <InputRightAddon>
//       <Button>Search</Button>
//     </InputRightAddon>
//   </InputGroup>
// </Box>