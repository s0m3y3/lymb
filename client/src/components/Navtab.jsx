import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
const Navbar = () => {
  return (
<Tabs>
  <TabList>
    <Tab as={Link} to="/">Home</Tab>
    <Tab as={Link} to="/login">Login</Tab>
    <Tab as={Link} to="/dashboard">Dashboard</Tab>
    <Tab as={Link} to="/browse">Browse</Tab>
  </TabList>

</Tabs>

  );
};

export default Navbar;