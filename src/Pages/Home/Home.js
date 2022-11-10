import React, { useContext, useEffect, useState } from "react";
import Services from "../../Components/Services/Services";
import Spinner from "../../Components/Spinner/Spinner";
import { setTile } from "../../utils/setTitle";
import styles from "./Home.module.css";
import { FaCameraRetro, FaVideo, FaRegFileImage, FaMicrophone } from "react-icons/fa";
import Footer from "../Shared/Footer/Footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

function Home() {
	setTile('Home');
	const [services, setServices] = useState(null);
	const { user, logOut } = useContext(AuthContext);
	const handleLogout = () => {
		logOut().then(() => {
			localStorage.clear();
		})
	}

	useEffect(() => {
		fetch('https://service-review.onrender.com/services', {
			headers: {
				"isshort": true
			}
		})
			.then(res => res.json())
			.then(data => setServices(data));
	}, []);


	return (
		<React.Fragment>
			{/* <Header /> */}


			<div className={styles.backgroundImageContainer}>
				<div className={styles.header}>
					<Link to="/">Kool Photography</Link>
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
					{
						user ? <img src={user.photoURL} alt={user.displayName} className={styles.userImage} /> : ''
					}
				</div>

				<div className={styles.backgroundTextContainer}>
					<h1>Gasper Zaldo</h1>
					<p>I am a photographer. I like a photograph people, happy people. Life stories. I try to to do it stylish and beautiful, feelings and emotions.</p>
					<div><button>Hire me</button></div>
				</div>
			</div>

			<div className={styles.whatCanDoContainer}>
				<h3 style={{ "textAlign": "center", "fontSize": "1.5rem" }}>What can do for you</h3>
				<div className={styles.whatCanDo}>
					<div className={styles.whatCanDoSingle}>
						<span className={styles.icons}><FaCameraRetro /></span>
						<p>Photo shooting</p>
						<span>High-quality and vibrant photos foreach of you</span>
					</div>

					<div className={styles.whatCanDoSingle}>
						<span className={styles.icons}><FaVideo /></span>
						<p>Video shooting</p>
						<span>Capture your moments so that they always remain with you</span>
					</div>

					<div className={styles.whatCanDoSingle}>
						<span className={styles.icons}><FaRegFileImage /></span>
						<p>Retouch</p>
						<span>Your photos will be the most beautiful</span>
					</div>

					<div className={styles.whatCanDoSingle}>
						<span className={styles.icons}><FaMicrophone /></span>
						<p>Sound recording</p>
						<span>Only high-quality recording of your sound and its processing</span>
					</div>
				</div>
			</div>

			<div className={styles.latestWorks}>
				<div className={styles.workTitle}>
					<div></div>
					<h3 style={{ "textAlign": "center", "fontSize": "1.5rem" }}>My latest works</h3>
				</div>
				<div className={styles.latestWorksImages}>
					<img src="https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?cs=srgb&dl=pexels-sebastian-palomino-1955134.jpg&fm=jpg&w=640&h=960" alt="" />
					<img src="https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?cs=srgb&dl=pexels-kaique-rocha-775201.jpg&fm=jpg&w=640&h=960" alt="" />
					<img src="https://images.pexels.com/photos/1875480/pexels-photo-1875480.jpeg?cs=srgb&dl=pexels-sebastian-palomino-1875480.jpg&fm=jpg&w=640&h=960" alt="" />

				</div>
			</div>

			{!services ?
				<div className={styles.spinnerContainer}>
					<Spinner />
				</div> : ''}

			{services ? <Services services={services} /> : ''}
			<Footer />
		</React.Fragment>
	);
}

export default Home;
