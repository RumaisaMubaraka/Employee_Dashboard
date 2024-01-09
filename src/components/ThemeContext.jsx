import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("default");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const getThemeClassName = () => {
    switch (theme) {
      case "theme1":
        return "theme1";
      case "theme2":
        return "theme2";
      default:
        return "default-theme";
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, getThemeClassName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const { theme, getThemeClassName, changeTheme } = useContext(ThemeContext);

  return { theme, getThemeClassName, changeTheme };
};
