import { Logo } from "./logo";
import { Navbar } from "./navbar";
import { UserSection } from "./usersection";
import "./Header.css";

export const Header = () => {
  return (
    <div className="header_wrapper">
      <div className="header_navbar_wrapper">
        <Navbar />
      </div>
      <div className="header_logo_wrapper">
        <Logo />
      </div>
      <div className="header_usersection_wrapper">
        <UserSection />
      </div>
    </div>
  );
};
