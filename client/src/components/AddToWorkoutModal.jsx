import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import "@fontsource-variable/lexend-peta";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const AddToWorkoutModal = ({ isOpen, onClose }) => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Ensure it's an array
  const workouts = userData.workouts || [];
  console.log(workouts);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent size="full">
        <ModalHeader>Select Workout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Menu>
            <MenuButton as={Button} colorScheme="blue">
              <p>Click for dropdown of workouts</p>
            </MenuButton>
            <MenuList>
              {workouts?.map((workout) => (
                <MenuItem onClick= {() => {
                  console.log(workout._id);
                  onClose;
                }}> {workout.name}</MenuItem>
              ))}
            </MenuList>
          </Menu>{" "}
          {/* <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button> */}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddToWorkoutModal;
