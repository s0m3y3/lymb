import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Outlet />
    </ChakraProvider>
  );
}

export default App;
