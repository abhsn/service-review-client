import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import styles from "./RemoveConfirm.module.css";

function RemoveConfirm({ setRemove, review, reviews, setReviews }) {
	const { user } = useContext(AuthContext);

	const handleRemove = () => {
		fetch(`http://localhost:5000/edit-review/${review._id}`, {
			method: 'DELETE',
			headers: {
				"content-type": "application/json",
				"authorization": `Bearer ${localStorage.getItem('token')}`,
				"userId": `${user.uid}`
			}
		})
			.then(res => res.json())
			.then(data => {
				// console.log(data);
				if (data.message !== 'Unauthorized Access' || data.deletedCount === 1) {
					const newArray = reviews.filter(r => r._id !== review._id);
					setReviews(newArray);
					setRemove(false);
				}
			});
	}

	return (
		<div className={styles.confirmContainer}>
			<div className={styles.confirmBox}>
				<p>Are you sure?</p>
				<div className={styles.buttonContainer}>
					<button className={styles.button} onClick={() => handleRemove()}>Yes</button>

					<button className={styles.button} onClick={() => setRemove(false)}>Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default RemoveConfirm;