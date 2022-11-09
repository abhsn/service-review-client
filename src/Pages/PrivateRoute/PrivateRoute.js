import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import styles from './PrivateRoute.module.css';

function PrivateRoute({ children }) {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();
	if (loading) {
		return (
			<div className={styles.spinnerContainer}>
				<Spinner />
			</div>
		);
	} else {
		if (user) {
			return (
				<div>
					{children}
				</div>
			);
		} else {
			return (
				<Navigate to="/login" state={{ from: location }} replace></Navigate>
			);
		}
	}
}

export default PrivateRoute;