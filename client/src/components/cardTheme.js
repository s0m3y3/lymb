import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: "#f0f3f5", // Anti-Flash White
    width: "95%",
  },
  header: {
    color: "#0e9594", // Dark Cyan
    as: "h3",
    size: "md",
  },
});

export const cardTheme = defineMultiStyleConfig({ baseStyle });
