import React from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import Auth from "../utils/auth";

const Navbar = () => {
  return (
    <Tabs>
      <TabList>
        <Tab as={Link} to="/">
          Home
        </Tab>

        {Auth.loggedIn() ? (
          <>
            <Tab as={Link} to="/dashboard">
              Dashboard
            </Tab>
            <Tab as={Link} to="/browse">
              Browse
            </Tab>
            <Button
              colorScheme="white"
              textColor={"black"}
              size="md"
              onClick={Auth.logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Tab as={Link} to="/login">
              Login
            </Tab>
            
            <Tab as={Link} to="/signup">
              Sign Up
            </Tab>
          </>
        )}
      </TabList>
    </Tabs>
  );
};

export default Navbar;
