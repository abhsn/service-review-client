import styles from "./Review.module.css";

function Review({ review }) {
	const { name, comment, time, userId } = review;
	const date = new Date(parseFloat(time));
	const month = date.toLocaleString('default', { month: 'long' });
	return (
		<div className={styles.reviewContianer}>
			<div className={styles.reviewText}>
				<p><strong>{name}</strong></p>
				<p>{comment}</p>
				<p><small>{`${month} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</small></p>
			</div>
		</div>
	);
}

export default Review;