import React from "react";
import { useTheme } from "./ThemeContext";

const ThemeSwitcher = () => {
  const { changeTheme } = useTheme();

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
  };

  return (
    <div className="theme-switches">
      <button className="nav-link" onClick={() => handleThemeChange("theme1")}>
        Theme 1
      </button>
      <button className="nav-link" onClick={() => handleThemeChange("theme2")}>
        Theme 2
      </button>
      <button className="nav-link" onClick={() => handleThemeChange("default")}>
        Default Theme
      </button>
    </div>
  );
};

export default ThemeSwitcher;
