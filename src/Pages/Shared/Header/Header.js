import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import styles from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUser } from "react-icons/fi";

function Header() {
	const { user, logOut } = useContext(AuthContext);
	const [showMenu, setShowMenu] = useState(false);
	const handleLogout = () => {
		logOut().then(() => {
			localStorage.clear();
		})
	}

	return (
		<nav className={styles.navbar} >
			<Link className={styles.navlink} to="/">Home</Link>

			{/* mobile */}
			{showMenu ?
				<div className={styles.hamMenuContent}>
					<Link className={styles.navlink} to="/services">Services</Link>

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
						user ? <a onClick={handleLogout} className={styles.logout}>Log out</a> : ''
					}
				</div> : ''}

			<div className={styles.desktopMenu}>
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
				{
					!user ? <Link className={styles.navlink} to="/login">Login</Link> : ''
				}

				{/* shows when user is logged in */}
				{
					user ? <button onClick={handleLogout} className={styles.logout}>Log out</button> : ''
				}
			</div>

			<div className={styles.hamburger} onClick={() => setShowMenu(!showMenu)}>
				<GiHamburgerMenu />
			</div>

			{
				user && user.photoURL && <img src={user.photoURL} alt={user.displayName} className={styles.userImage} />
			}
			{
				user && !user.photoURL && <span style={{ color: 'white', fontSize: '2rem' }}><FiUser /></span>
			}
		</nav>
	);
}

export default Header;