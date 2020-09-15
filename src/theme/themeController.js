import { defaultTheme } from "../theme";
import { createMuiTheme } from "@material-ui/core";
import { useState } from "react";

const [currentTheme] = defaultTheme();

export const useThemeMode = () => {
  const [theme, setTheme] = useState(currentTheme);
  // const {
  //   palette: { type },
  // } = theme;

  const selectTheme = () => {
    const updatedTheme = {
      // ...theme,
      palette: {
        // ...theme.palette,
        type: "dark",
      },
    };
    setTheme(updatedTheme);
  };
  const newTheme = createMuiTheme(theme);

  return [newTheme, selectTheme];
};
