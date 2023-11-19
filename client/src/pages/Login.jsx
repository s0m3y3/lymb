import LoginForm from "../components/LoginForm";
// import SignupForm from "../components/SignupForm";
import { Container, Button } from "@chakra-ui/react";
import { useState } from "react";

// TODO: Create a signup button that conditionally hides the login form and shows the signup form

// const signupHandler = () => {
//   const [signUp, setSignUp] = useState(false);
//   setSignUp(true);
// };

const Login = () => {
  return (
    <Container>
      <LoginForm />

    </Container>
  );
};

export default Login;
