import { Link } from "react-router-dom";
import './Header.module.css';

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/services" style={{ marginLeft: "auto" }}>Services</Link>
      {/* <Link to="/reviews">My Reviews</Link> */}
      {/* <Link to="/add">Add Services</Link> */}
      <Link to="/blog">Blog</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Header;
