import styles from "./Confirm.module.css";

function Confirm({ setConfirm, setEdit }) {
	return (
		<div className={styles.confirmContainer}>
			<div className={styles.confirmBox}>
				<p>Are you sure?</p>
				<div className={styles.buttonContainer}>
					<button className={styles.button} onClick={() => {
						setConfirm(false);
						setEdit(false);
					}}>Yes</button>

					<button className={styles.button} onClick={() => setConfirm(false)}>Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default Confirm;