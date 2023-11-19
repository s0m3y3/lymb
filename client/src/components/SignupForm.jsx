import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <FormErrorMessage
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </FormErrorMessage>

        <FormControl marginY={5}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            placeholder="Your name"
            name="username"
            onChange={handleInputChange}
            value={userFormData.name}
            required
          />
          {/* <FormHelperText type="invalid">
            Name is required!
          </FormHelperText> */}
        </FormControl>
        <FormControl marginY={5}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          {/* <FormHelperText type="invalid">
            Email is required!
          </FormHelperText> */}
        </FormControl>

        <FormControl marginY={5}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          {/* <FormHelperText type="invalid">
            Password is required!
          </FormHelperText> */}
        </FormControl>
        <Button
          disabled={
            !(userFormData.name && userFormData.email && userFormData.password)
          }
          type="submit"
          // variant="success"
          colorScheme="blue"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
