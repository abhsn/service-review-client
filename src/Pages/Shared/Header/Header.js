import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import styles from "./Header.module.css";

function Header() {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  return (
    <nav className={styles.navbar} >
      <Link className={styles.navlink} to="/">Home</Link>
      <Link className={styles.navlink} to="/services" style={{ marginLeft: "auto" }}>Services</Link>

      {/* shows when user is logged in */}
      {
        user ?
          <React.Fragment>
            <Link className={styles.navlink} to="/reviews">My Reviews</Link>
            <Link className={styles.navlink} to="/add">Add Services</Link>
          </React.Fragment>
          : ''
      }

      {/* publicly available link */}
      <Link className={styles.navlink} to="/blog">Blog</Link>

      {/* shows when the user is not loggedd in */}
      {
        !user ? <Link className={styles.navlink} to="/login">Login</Link> : ''
      }

      {/* shows when user is logged in */}
      {
        user ? <button onClick={logOut} className={styles.logout}>Log out</button> : ''
      }
      {
        user ? <img src={user.photoURL} alt={user.displayName} /> : ''
      }
    </nav>
  );
}

export default Header;
