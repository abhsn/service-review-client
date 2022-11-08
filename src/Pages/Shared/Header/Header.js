import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <nav className={styles.navbar} >
      <Link className={styles.navlink} to="/">Home</Link>
      <Link className={styles.navlink} to="/services" style={{ marginLeft: "auto" }}>Services</Link>
      {/* <Link to="/reviews">My Reviews</Link> */}
      {/* <Link to="/add">Add Services</Link> */}
      <Link className={styles.navlink} to="/blog">Blog</Link>
      <Link className={styles.navlink} to="/login">Login</Link>
    </nav>
  );
}

export default Header;
