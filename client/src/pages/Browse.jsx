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
import strengthLogo from "../assets/dumbbell.png"
import cardioLogo from "../assets/cardio.png"
import stretchLogo from "../assets/stretch.png"
import coreLogo from "../assets/core.png"
import { useQuery } from '@apollo/client';
import { QUERY_EXERCISE } from '../utils/queries.js'; // Import your mutations

const Browse = () => {
  //todo: Figure out this query exercise. It does not work. 
  const data  = useQuery(QUERY_EXERCISE);
  const exercises = data?.exercises || [];
  console.log(data)
  console.log(exercises)

  return (
    <Container maxW="100%">
      <Box my={10} >
        <InputGroup>
          <InputLeftAddon
            fontFamily={theme.fonts.heading}
            as="h2"
            size="md"
            children="Search Exercises"
          />
          <Input size="md"></Input>
          <InputRightAddon>
            <Button>Search</Button>
          </InputRightAddon>
        </InputGroup>
      </Box>

      <Box my={10} display="flex" flexDirection={'column'}>
        <Heading mb={5} alignSelf='center' fontFamily={theme.fonts.heading} as="h2" size="md">
          Browse by Type
        </Heading>
        <Wrap justify={"space-evenly"}>
          <Card width={150}>
            <CardHeader>
              <Heading
                color={theme.colors.darkCyan}
                as="h3"
                size="sm"
              >
                <Image src={strengthLogo} alt="Strength-photo"></Image>
                </Heading>
            </CardHeader>
            <CardBody>
            </CardBody>
          </Card>

          <Card width={150}>
            <CardHeader>
              <Heading
                color={theme.colors.darkCyan}
                as="h3"
                size="sm"
              >
                <Image src={cardioLogo} alt="cardio-photo"></Image>
              </Heading>
            </CardHeader>
            <CardBody>
            </CardBody>
          </Card>

          <Card width={150}>
            <CardHeader>
              <Heading
                color={theme.colors.darkCyan}
                as="h3"
                size="sm"
              >
              <Image src={stretchLogo} alt="stretch-photo"></Image>
              </Heading>
            </CardHeader>
            <CardBody>
            </CardBody>
          </Card>
    
          <Card width={150}>
            <CardHeader>
              <Heading
                color={theme.colors.darkCyan}
                as="h3"
                size="sm"
              >
                <Image src={coreLogo} alt="core-photo"></Image>
              </Heading>
            </CardHeader>
          <CardBody>

            </CardBody>
          </Card>

        </Wrap>
      </Box>

      <Box my={10} display='flex' flexDirection={'column'}>
        <Heading mb={5} alignSelf='center' fontFamily={theme.fonts.heading} as="h2" size="md">
          Results
        </Heading>
        <SimpleGrid spacing={10} minChildWidth={300}>
          <Card>
            <CardHeader></CardHeader>
            <CardBody>testing {exercises}</CardBody>
          </Card>
          
          <Card>
            <CardHeader>Squats (delete me later)</CardHeader>
            <CardBody>A lower-body exercise that targets the quadriceps, hamstrings, and glutes. Legs, Glutes. </CardBody>
          </Card>

          <Card>
            <CardHeader></CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card>
            <CardHeader></CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card>
            <CardHeader></CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card>
            <CardHeader></CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card>
            <CardHeader></CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card>
            <CardHeader></CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card>
            <CardHeader></CardHeader>
            <CardBody></CardBody>
          </Card>

          <Card>
            <CardHeader></CardHeader>
            <CardBody></CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Browse;
