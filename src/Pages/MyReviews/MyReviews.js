import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import MyReview from "../../Components/MyReview/MyReview";
import Spinner from "../../Components/Spinner/Spinner";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import styles from "./MyReviews.module.css"

function MyReviews() {
	const [reviews, setReviews] = useState({});
	const { loading } = useContext(AuthContext);
	const [unauthorized, setUnauthorized] = useState(false);

	const id = useParams().id;

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
					setReviews(data);
				}
			});
	}, [id]);
	return (
		<div className={styles.reviewContainer}>
			{
				unauthorized ? <h3>Unauthorized Access</h3> : ''
			}
			<div className={styles.spinnerContainer}>
				{
					loading ? <Spinner /> : ''
				}
			</div>
			{
				(Object.keys(reviews).length) ?
					reviews.map(review => <MyReview key={review._id} review={review} />)
					: ''
			}
		</div>
	);
}

export default MyReviews;