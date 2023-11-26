import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Image,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Tab,
  Tabs
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Auth from "../utils/auth";
import whitelogo from "../assets/logo-light.png"
import theme from '../components/theme';

const Links = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Browse', to: '/browse' },
];

const NavLink = ({ children, to }) => {
  return (
    <Link
      to={to}
      as={Button}
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navBackgroundColor = useColorModeValue(theme.colors.carmine);
  const tabTextColor = useColorModeValue(theme.colors.darkCyan);
  const tabStyle = {
    fontFamily: theme.fonts.heading,
    color: useColorModeValue(theme.colors.antiFlashWhite),
    fontSize: "20px",
    fontWeight: "Bold"
  }


  return (
    <>
      <Box bg={navBackgroundColor} px={4} py={1} style={tabStyle}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center" >
            <Image src={whitelogo} alt="white-logo" boxSize="60px" margin="5px" />
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }} >
              {Links.map((link) => (
                <NavLink key={link.label} to={link.to} >
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems="center" m={2}>
            {Auth.loggedIn() ? (
              <Box onClick={Auth.logout}>
                Logout
              </Box>
            ) : (
              <>
                <NavLink to="/login" style={{ marginRight: '10px' }}>Login</NavLink>
                {/* Below was commented up for a better mobile responsive view. Signup link, added to /Login */}
                {/* <NavLink to="/signup">Sign Up</NavLink> */}
              </>
            )}
          </Flex>
        </Flex>

{/* This code is for the dropdown menu when screen size is smaller - Responsiveness */}
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.label} to={link.to}>
                  {link.label}
                </NavLink>
              ))}
              {Auth.loggedIn() && (
                <Box onClick={Auth.logout}>
                  Logout
                </Box>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;

//Future implementation. Avatar. 
{/* <Menu>
<MenuButton
  as={Button}
  rounded="full"
  variant="link"
  cursor="pointer"
  minW={0}
>
  <Avatar
    size="sm"
    src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
  />
</MenuButton>
<MenuList>
  <MenuItem>Link 1</MenuItem>
  <MenuItem>Link 2</MenuItem>
  <MenuDivider />
  <MenuItem>Link 3</MenuItem>
</MenuList>
</Menu> */}