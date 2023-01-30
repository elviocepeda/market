import { NAVBAR } from "./constants";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar_wrapper">
      <ul>
        {NAVBAR.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.path} style={item.style}>
                <span>{item.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
