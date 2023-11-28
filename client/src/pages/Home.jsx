import { Box, Image, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import theme from '../components/theme';
import '@fontsource-variable/lexend-peta';
import lightLogo from '../assets/logo-light.png';
import dumbbell from '../assets/dumbbell.jpg';

const Home = () => {
    const backgroundImageStyle = {
        backgroundImage: `url(${dumbbell})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'auto',
        height: '100%', 
       
         
    };

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            margin={5}
            mb={10}
            style={backgroundImageStyle}  
        >
            
            <Box position="relative" mb={20}>
                <Image mt={20} src={lightLogo} alt="Red Logo" boxSize={350} />
            </Box>
            
            <Box textAlign="center" >
                <Heading mb={10} fontFamily={theme.fonts.heading} as='p' size='lg' color={theme.colors.white}>
                    ❮❮ Love Your Mind & Body ❯❯
                </Heading >
                <Text fontWeight={'bold'} fontSize={'1.2em'} mb={3} color={'white'}>
                    Create your free account to enjoy LYMB's features:
                </Text>
                <UnorderedList p={8} fontWeight={'bold'} fontSize={'1.1em'} color={'white'} textAlign={"center"} >
                    <ListItem p={1}>Choose from our list of exercises</ListItem>
                    {/* <ListItem fontWeight={'bold'} fontSize={'1.1em'}>Automatically generate a workout based on your preferences</ListItem> */}
                    <ListItem p={1}>Create your own custom workouts</ListItem>
                    <ListItem p={1}>Use our Interval Timer for your new Workout!</ListItem>
                </UnorderedList>
            </Box>
        </Box>
    );
}

export default Home;
