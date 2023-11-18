import { extendTheme } from "@chakra-ui/react";
import { cardTheme } from './cardTheme';
// All theme elements compiled for export
const theme = extendTheme({
  // To use theme colors, Use these imports at the top of each page
  // import { theme } from './components/theme.js';
  // Here is a link to the Chakra page on style props https://chakra-ui.com/docs/styled-system/style-props
  colors: {
    // TODO: Rename the colors based on where we want them on the page for ease of use
    carmine: "#9a031e", // Dark Red
    outerSpace: "#36413e", // Dark Gray
    darkCyan: "#0e9594", // Dark Cyan
    antiFlashWhite: "#f0f3f5", // Off-White
    timberwolf: "#d8d4d5", // Light Gray
  },
  // Use thess imports on any pages where you would like to use the external font over the default
  // import { theme } from './compontents/theme.js';
  // import "@fontsource-variable/lexend-peta";
  // This links the the chakra page on using custom fonts https://chakra-ui.com/community/recipes/using-fonts
  fonts: {
    heading: `'Lexend Peta Variable', sans-serif`,
  },
});


export default theme;
