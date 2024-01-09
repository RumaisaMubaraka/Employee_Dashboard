import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
const Header2 = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg">
         
          <ul className="nav-items ml-auto">
          <div className="company-logo">
          <Link className="navbar-brand" to="/">
            Team Hub
          </Link>
          </div>
            <li className="nav-item">
              <a href="/" className="nav-link text-white">
                HOME
              </a>
            </li>
            

            <li class="nav-item">
              <ThemeSwitcher />
            </li>
          </ul>
        </nav>
     
      </header>
    </div>
  );
};

export default Header2;
