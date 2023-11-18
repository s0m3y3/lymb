import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
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

const Browse = () => {
  return (
    <Container maxW="100%">
      <Box my={10}>
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
              ></Heading>
            </CardHeader>
            <CardBody>
              <Image />
            </CardBody>
          </Card>
          <Card width={150}>
            <CardHeader>
              <Heading
                color={theme.colors.darkCyan}
                as="h3"
                size="sm"
              ></Heading>
            </CardHeader>
            <CardBody>
              <Image />
            </CardBody>
          </Card>
          <Card width={150}>
            <CardHeader>
              <Heading
                color={theme.colors.darkCyan}
                as="h3"
                size="sm"
              ></Heading>
            </CardHeader>
            <CardBody>
              <Image />
            </CardBody>
          </Card>
          <Card width={150}>
            <CardHeader>
              <Heading
                color={theme.colors.darkCyan}
                as="h3"
                size="sm"
              ></Heading>
            </CardHeader>
            <CardBody>
              <Image />
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
