import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import * as actionType from "../../constants/actionTypes";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.accessToken;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles["menu-right"]}>
          <ul className={styles.nav__list}>
            <li className={styles["nav__list-logo"]}>
              <div component={Link} to="/" className={styles["logo-link"]}>
                <img src="logo.jpg" alt="logo" className={styles["logo-img"]} />
              </div>
            </li>
            <li className={styles["nav__list-item"]}>
              About
              <ul className={styles["nav__list-item-drop"]}>
                <li>How it works</li>
                <li>Ways to play</li>
              </ul>
            </li>
            <li className={styles["nav__list-item"]}>
              Study
              <ul className={styles["nav__list-item-drop"]}>
                <li>Public quizes</li>
                <li>Test game</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles["menu-left"]}>
          <ul className={styles.nav__list}>
            <li className={styles["nav__list-item"]}>Contact</li>
            <li className={styles["nav__list-item"]}>Play</li>
            {user ? (
              <li className={styles["nav__list-item"]}>
                <h3>{user.result.firstName}</h3>
                <button onClick={logout} className={styles["nav__list-item"]}>
                  Log out
                </button>
              </li>
            ) : (
              <button
                component={Link}
                to="/auth"
                className={styles["nav__list-item"]}
              >
                Log in
              </button>
            )}
            <li className={styles["nav__list-item"]}>
              EN
              <ul className={styles["nav__list-item-drop"]}>
                <li>Polski</li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
