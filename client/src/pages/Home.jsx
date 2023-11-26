import { AspectRatio, Box, Heading, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import theme from '../components/theme';
import '@fontsource-variable/lexend-peta';
import redLogo from '../assets/logo-red.png';
import image1 from '../assets/introPhoto1.jpg';

const Home = () => {
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={5}  mb={10}>
            <Box>
            <Image src={image1} alt="https://unsplash.com/@kikekiks"></Image>
            {/* <AspectRatio>
                <iframe src={tbd} title='Lymb intro' allowFullScreen />
            </AspectRatio> */}
            </Box>
            <Image src={redLogo} boxSize={250}my={10} />
            <Heading mb={10} fontFamily={theme.fonts.heading} as='p' size='lg' color={theme.colors.carmine}>❮❮ Your workout buddy! ❯❯</Heading>
            <Text fontWeight={'bold'} fontSize={'1.2em'} mb={3}>Create your free account to enjoy Lymb's features:</Text>
            <UnorderedList>
                <ListItem fontWeight={'bold'} fontSize={'1.1em'}>Choose from our list of exercises</ListItem>
                {/* <ListItem fontWeight={'bold'} fontSize={'1.1em'}>Automatically generate a workout based on your preferences</ListItem> */}
                <ListItem fontWeight={'bold'} fontSize={'1.1em'}>Create your own custom workouts</ListItem>
                <ListItem fontWeight={'bold'} fontSize={'1.1em'}>Use our Interval Timer for your new Workout!</ListItem>
            </UnorderedList>
        </Box>
    );
}

export default Home;