import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Spacer,
  VStack,
  Wrap,
} from "@chakra-ui/react";

import theme from "../components/theme";

const Dashboard = () => {
  return (
    <Wrap justify={"space-evenly"}>
      <VStack
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
        <Card w="95%">
          <CardHeader><Heading as='h3' size='md' color={theme.colors.darkCyan}>Full Body</Heading></CardHeader>
          <CardBody>
            I'm typing stuff in here to test some spacing issues
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
        <Card w="95%">
          <CardHeader><Heading as='h3' size='md' color={theme.colors.darkCyan}>Full Body</Heading></CardHeader>
          <CardBody></CardBody>
          <CardFooter></CardFooter>
        </Card>
        <Card w="95%">
          <CardHeader><Heading as='h3' size='md' color={theme.colors.darkCyan}>Full Body</Heading></CardHeader>
          <CardBody></CardBody>
          <CardFooter></CardFooter>
        </Card>
      </VStack>
      <VStack
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
          <CardHeader><Heading as='h3' size='md' color={theme.colors.darkCyan}>Full Body</Heading></CardHeader>
          <CardBody>
            I'm typing stuff in here to test some spacing issues
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
        <Card w="95%">
          <CardHeader><Heading as='h3' size='md' color={theme.colors.darkCyan}>Full Body</Heading></CardHeader>
          <CardBody></CardBody>
          <CardFooter></CardFooter>
        </Card>
        <Card w="95%">
          <CardHeader>Cardio</CardHeader>
          <CardBody></CardBody>
          <CardFooter></CardFooter>
        </Card>
      </VStack>
    </Wrap>
  );
};

export default Dashboard;
