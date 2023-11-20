import React from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import Auth from "../utils/auth";
import whitelogo from "../assets/logo-light.png"
import theme from '../components/theme';

const Navbar = () => {
  const navBackgroundColor = useColorModeValue(theme.colors.carmine); 
  const tabTextColor = useColorModeValue(theme.colors.darkCyan); 
  const tabStyle = {
    fontFamily: theme.fonts.heading,
    color: useColorModeValue(theme.colors.antiFlashWhite),
    fontSize: "25px",
    fontWeight: "Bold"
  }

  return (
    <Tabs bg={navBackgroundColor}>
      <TabList style={tabStyle}>
      <Image src={whitelogo} alt="white-logo" boxSize="60px" margin="5px"></Image>
        <Tab as={Link} to="/" _selected={{ color:  tabTextColor}}>
          Home
        </Tab>

        {Auth.loggedIn() ? (
          <>
            <Tab as={Link} to="/dashboard" _selected={{ color:  tabTextColor}}>
              Dashboard
            </Tab>
            <Tab as={Link} to="/browse" _selected={{ color:  tabTextColor}}>
              Browse
            </Tab>
            <Tab
              size="md"
              fontWeight="bold"
              onClick={Auth.logout}
            >
              Logout
            </Tab>
          </>
        ) : (
          <>
            <Tab as={Link} to="/login" _selected={{ color:  tabTextColor}}>
              Login
            </Tab>
            
            <Tab as={Link} to="/signup" _selected={{ color:  tabTextColor}}>
              Sign Up
            </Tab>
          </>
        )}
      </TabList>
    </Tabs>
  );
};

export default Navbar;
