import React, { useContext , useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";

import "./Navbar.css";
import UserContext from '../contexts/UserContext';

export default function NavBar({ items }) {
  const { handleLogout } = useContext(UserContext);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    setMenu(!menu);
  }

  function handleLogoutClick() {
    handleLogout();
    navigate("/");
  }

  return (
    <>
      <nav className="NavbarItems">
      <Logo/>
        <h1>Movie List</h1>
        <div className="menu-icon" onClick={handleClick}>
          <i className={menu ? "fa-solid fa-x" : "fa-solid fa-bars"}></i>
        </div>
        <ul className={menu ? "nav-menu active" : "menu-icon"}>
          {items.map((item, index) => (
            <li
              key={index}
              className={menu ? `active ${item.cName}` : "nav-links"}
            >
              {item.title === "Sair" ? (
                <Link to={item.ref} onClick={handleLogoutClick}>
                  {item.title}
                </Link>
              ) : (
                <Link to={item.ref}>{item.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
