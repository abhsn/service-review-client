import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { setTile } from "../../utils/setTitle";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import styles from "./Register.module.css";

function Register() {
	setTile('Register');
	const { register, updateUserProfile, setUser } = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/";
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// const getJWT = (currentUser) => {
	// 	fetch('http://localhost:5000/jwt', {
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

	const handleRegister = e => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		const confirm = form.confirm.value;
		const url = form.url.value;
		if (password !== confirm) {
			setError('Password dosn\'t match');
			setLoading(false);
			return;
		}
		register(email, password)
			.then(result => {
				if (result.user.uid) {
					setLoading(false);
					setUser(result.user);
					updateUserProfile(name, url)
						.then(() => {
							const currentUser = {
								uid: result.user.uid
							}
							// getJWT(currentUser);
							const newObj = { ...result.user };
							setUser(newObj);
						})
						.catch(err => setError(err));
					navigate(from, { replace: true });
				}
			})
			.catch(err => {
				setLoading(false);
				setError(err.message);
			})
	};

	return (
		<React.Fragment>
			<Header />
			{!loading ?
				<div className={styles.registerContainer}>
					{/* <img className={styles.loginImage} src="https://downloadscdn5.freepik.com/download_vector/jpg/114/114360/4/4957/4957136_4957136.jpg?token=exp=1668081663~hmac=ac3c8303a6094600c794c25418a3bbcf" alt="" /> */}
					<div className={styles.formContainer}>
						<form className={styles.form} onSubmit={handleRegister}>
							<h3 className={styles.formTitle}>Register</h3>

							<div className={styles.fieldContainer}>
								<label htmlFor="email">Email</label>
								<input type="email" id="email" name="email" required />
							</div>

							<div className={styles.fieldContainer}>
								<label htmlFor="name">Name</label>
								<input type="text" id="name" name="name" required />
							</div>

							<div className={styles.fieldContainer}>
								<label htmlFor="url">PhotoURL</label>
								<input type="url" id="url" name="url" required />
							</div>

							<div className={styles.fieldContainer}>
								<label htmlFor="password">Password</label>
								<input type="password" id="password" name="password" required minLength="6" />
							</div>

							<div className={styles.fieldContainer}>
								<label htmlFor="confirm">Confirm Password</label>
								<input type="password" id="confirm" name="confirm" required minLength="6" />
							</div>

							{error ? <small style={{ color: "red" }}>{error}</small> : <React.Fragment></React.Fragment>}

							<input className={styles.loginButton} type="submit" value="Register" />
							<small>Already have an account? <Link to="/login">Login here</Link>.</small>
						</form>
					</div>
				</div>
				:
				<div className={styles.spinnerContainer}>
					<Spinner />
				</div>
			}
			<Footer />
		</React.Fragment>
	);
}

export default Register;
