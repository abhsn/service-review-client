import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { setTile } from "../../utils/setTitle";
import styles from "./Register.module.css";

function Register() {
	setTile('Register');
	const { register } = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/";
	const [loading, setLoading] = useState(false);

	const handleRegister = async e => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		try {
			const result = await register(email, password);
			if (result?.uid) setLoading(false);
			navigate(from, { replace: true });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<React.Fragment>
			{!loading ?
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
						<label htmlFor="password">Password</label>
						<input type="password" id="password" name="password" required minLength="6" />
					</div>
					<input className={styles.loginButton} type="submit" value="Register" />
					<small>Already have an account? <Link to="/login">Login here</Link>.</small>
				</form>
				:
				<div className={styles.spinnerContainer}>
					<Spinner />
				</div>
			}
		</React.Fragment>
	);
}

export default Register;
