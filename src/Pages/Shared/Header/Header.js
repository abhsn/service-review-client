import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import styles from "./Header.module.css";

function Header() {
	const { user, logOut } = useContext(AuthContext);
	const handleLogout = () => {
		logOut().then(() => {
			localStorage.clear();
		})
	}

	return (
		<nav className={styles.navbar} >
			<Link className={styles.navlink} to="/">Home</Link>
			<Link className={styles.navlink} to="/services" style={{ marginLeft: "auto" }}>Services</Link>

			{/* shows when user is logged in */}
			{
				user ?
					<React.Fragment>
						<Link className={styles.navlink} to={`/reviews/${user.uid}`}>My Reviews</Link>
						<Link className={styles.navlink} to="/add">Add Service</Link>
					</React.Fragment>
					: ''
			}

			{/* publicly available link */}
			<Link className={styles.navlink} to="/blog">Blog</Link>

			{/* shows when the user is not loggedd in */}
			{!user ? <Link className={styles.navlink} to="/login">Login</Link> : ''}
			{!user ? <Link className={styles.navlink} to="/register">Register</Link> : ''}

			{/* shows when user is logged in */}
			{
				user ? <button onClick={handleLogout} className={styles.logout}>Log out</button> : ''
			}
			{
				user ? <img src={user.photoURL} alt={user.displayName} className={styles.userImage} /> : ''
			}
		</nav>
	);
}

export default Header;