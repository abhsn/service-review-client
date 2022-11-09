import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import MyReview from "../../Components/MyReview/MyReview";
import styles from "./MyReviews.module.css"

function MyReviews() {
	const [reviews, setReviews] = useState({});
	const [loading, setLoading] = useState(true);
	const [unauthorized, setUnauthorized] = useState(false);

	const id = useParams().id;

	// const serviceIds = [];
	// reviews.map(review => serviceIds.push(review._id));
	// console.log(serviceIds);

	useEffect(() => {
		fetch(`http://localhost:5000/my-reviews/${id}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.message === 'Unauthorized Access' || data.message === 'Forbidden') {
					setUnauthorized(true);
				} else {
					setLoading(false);
					setReviews(data);
				}
			});
	}, [id]);
	return (
		<div className={styles.reviewContainer}>
			{
				!loading ?
					reviews.map(review => <MyReview key={review._id} review={review} />)
					: ''
			}
			{
				unauthorized ? <h3>Unauthorized Access</h3> : ''
			}
		</div>
	);
}

export default MyReviews;