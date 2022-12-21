import React, { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import "./Login.module.css";
import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { setTile } from "../../utils/setTitle";
import Spinner from "../../Components/Spinner/Spinner";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";

function Login() {
	setTile('Login');
	const { logIn, googleSignIn, user } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/";

	// const getJWT = (currentUser) => {
	// 	fetch('https://service-review-server-nrebl34n9-abhsn.vercel.app/jwt', {
	// 		method: "POST",
	// 		headers: {
	// 			"content-type": "application/json"
	// 		},
	// 		body: JSON.stringify(currentUser)
	// 	})
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			setLoading(false);
	// 			localStorage.setItem('token', data.token);
	// 		});
	// }

	const handleLogIn = () => {
		setLoading(true);
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		logIn(email, password)
			.then(result => {
				// const user = result.user;

				// const currentUser = {
				// 	uid: user.uid
				// }

				setLoading(false);

				// get jwt token
				// getJWT(currentUser);

				navigate(from, { replace: true });
			})
			.catch(err => {
				setLoading(false);
				setError(err.message);
			});
	};

	const handleGoogleLogIn = async () => {
		setLoading(true);
		try {
			const result = await googleSignIn();
			if (result) {
				const user = result.user;
				// console.log(user);

				const currentUser = {
					uid: user.uid
				}

				setLoading(false);

				// get jwt token
				// getJWT(currentUser);

				navigate(from, { replace: true });
			}
		} catch (err) {
			setLoading(false);
			setError(err.message);
		};
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			{
				user ? <Navigate to="/login" state={{ from: location }} replace ></Navigate> : ''
			}
			<Header />
			{
				!loading ?
					<div style={{ flexGrow: 1 }} className={styles.loginContainer}>
						{/* <img className={styles.loginImage} src="https://downloadscdn5.freepik.com/download_vector/jpg/114/114360/4/4957/4957136_4957136.jpg?token=exp=1668081663~hmac=ac3c8303a6094600c794c25418a3bbcf" alt="" /> */}
						<div className={styles.formContainer}>
							<form className={styles.form} onSubmit={e => e.preventDefault()}>
								<h3 className={styles.formTitle}>Login</h3>

								<div className={styles.emailContainer}>
									<label htmlFor="email">Email</label>
									<input type="email" id="email" name="email" required />
								</div>

								<div className={styles.passwordContainer}>
									<label htmlFor="password">Password</label>
									<input type="password" id="password" name="password" required />
								</div>

								{error ? <small style={{ color: "red" }}>{error}</small> : <React.Fragment></React.Fragment>}

								<div className={styles.buttonContainer}>
									<div>
										<input onClick={handleLogIn} className={styles.loginButton} type="submit" value="Login" />
									</div>
									<small>or</small>
									<div>
										<button onClick={handleGoogleLogIn} className={styles.loginButton}><span className={styles.googleButton}><FcGoogle /></span>Login with Google</button>
									</div>
								</div>
								<small>Don't have an account? <Link to="/register">Register here</Link>.</small>
							</form>
						</div>
					</div>
					:
					<div style={{ flexGrow: 1 }} className={styles.spinnerContainer}>
						<Spinner />
					</div>
			}
			<Footer />
		</div>
	);
}

export default Login;