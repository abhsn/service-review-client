import { FiUser } from "react-icons/fi";
import styles from "./Review.module.css";

function Review({ review }) {
	const { name, comment, time, userId, image } = review;
	console.log(time);
	const date = new Date(parseFloat(time));
	const month = date.toLocaleString('default', { month: 'short' });

	return (
		<div className={styles.reviewContianer}>
			<div>
				{/* <img src={image} alt={name} className={styles.userPhoto} /> */}
				{
					image && <img src={image} alt={name} className={styles.userPhoto} />
				}
				{
					!image && <span style={{ fontSize: '2rem' }}><FiUser /></span>
				}
			</div>
			<div className={styles.reviewText}>
				<p><strong>{name}</strong></p>
				<p>{comment}</p>
				{/* date and time */}
				<p><small>{`${month} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</small></p>
			</div>
		</div>
	);
}

export default Review;