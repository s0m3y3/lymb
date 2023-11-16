import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { Container, Button } from "@chakra-ui/react";
import { useState } from "react";

// TODO: Create a signup button that conditionally hides the login form and shows the signup form
const [signUp, setSignUp] = useState(false);
const signupHandler = () => {
  setSignUp(true);
};
const Login = () => {
  if (signUp === false) {
    return (
      <Container>
        <LoginForm />
        <Button onClick={signupHandler}>Sign up</Button>
      </Container>
    );
  } else if (signUp === true) {
    return (
      <Container>
        <SignupForm />
      </Container>
    );
  }
};

export default Login;
