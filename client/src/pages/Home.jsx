import { AspectRatio, Box, Heading, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import theme from '../components/theme';
import '@fontsource-variable/lexend-peta';
import redLogo from '../assets/logo-red.png';


const Home = () => {
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={5}>
            <Box><Text>This is where we would add a workout video intro or welcome picture</Text>
            <Image></Image>
            {/* <AspectRatio>
                <iframe src={tbd} title='Lymb intro' allowFullScreen />
            </AspectRatio> */}
            </Box>
            <Image src={redLogo} boxSize={250}my={10} />
            <Heading mb={10} fontFamily={theme.fonts.heading} as='p' size='lg' color={theme.colors.carmine}>❮❮ Your workout buddy! ❯❯</Heading>
            <Text fontWeight={'bold'} fontSize={'1.2em'} mb={3}>Create your free account to enjoy Lymb's features:</Text>
            <UnorderedList>
                <ListItem fontWeight={'bold'} fontSize={'1.1em'}>Choose from our list of exercises</ListItem>
                <ListItem fontWeight={'bold'} fontSize={'1.1em'}>Automatically generate a workout based on your preferences</ListItem>
                <ListItem fontWeight={'bold'} fontSize={'1.1em'}>Create your own custom workouts</ListItem>
            </UnorderedList>
        </Box>
    );
}

export default Home;