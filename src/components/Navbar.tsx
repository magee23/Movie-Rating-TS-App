import { Link, useNavigate } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import Home from "../pages/home/Home";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("guest_session_id") !== null;
  const logout = () => {
    localStorage.removeItem("guest_session_id");
    navigate("/auth");
  };
  return (
    <Menu fixed="top" size="huge">
      <Menu.Item as={Link} to={"/"} style={{ fontSize: "1.5rem" }}>
        Home Page
      </Menu.Item>
      <Menu.Item as={Link} to={"/rate"} style={{ fontSize: "1.5rem" }}>
        Rated
      </Menu.Item>
      <Menu.Menu position="right">
        {isLoggedIn ? (
          <Menu.Item
            as={Button}
            style={{ fontSize: "1.5rem" }}
            onClick={logout}
          >
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item as={Link} to={"/auth"} style={{ fontSize: "1.5rem" }}>
            Auth Page
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}
