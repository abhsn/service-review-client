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
	const [error, setError] = useState(null);

	const handleRegister = async e => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		const confirm = form.confirm.value;
		if (password !== confirm) {
			setError('Password dosn\'t match');
			setLoading(false);
			return;
		}
		try {
			const result = await register(email, password);
			console.log(result);
			if (result?.uid) setLoading(false);
			navigate(from, { replace: true });
		} catch (err) {
			setLoading(false);
			setError(err.message);
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

					<div className={styles.fieldContainer}>
						<label htmlFor="confirm">Confirm Password</label>
						<input type="password" id="confirm" name="confirm" required minLength="6" />
					</div>

					{error ? <small style={{ color: "red" }}>{error}</small> : <React.Fragment></React.Fragment>}

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
