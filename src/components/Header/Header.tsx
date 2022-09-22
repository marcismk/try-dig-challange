import { logo } from "assets";
import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" />
    </div>
  );
};
