import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Divider, Text, Card, Button, Box, CardBody } from "@chakra-ui/react";
import theme from "./theme";
{
  /* <Divider orientation="horizontal"></Divider>
<Text>Exercise 1</Text>
<Button bg={theme.colors.carmine} color={theme.colors.antiFlashWhite}>
  Delete
</Button>
<Divider orientation="horizontal"></Divider>
<Text>Exercise 2</Text>{" "}
<Button bg={theme.colors.carmine} color={theme.colors.antiFlashWhite}>
  Delete
</Button> */
}

export function SortableExercise(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card m={3}>
        <CardBody>
          <Text>{props.id}</Text>
        </CardBody>
      </Card>
    </div>
  );
}
