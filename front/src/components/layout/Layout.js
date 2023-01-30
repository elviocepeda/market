import { Header } from ".";
import "./Layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="layout_wrapper">
      <div className="layout_container">
        <div>
          <Header />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
