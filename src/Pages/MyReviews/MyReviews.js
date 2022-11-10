import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Confirm from "../../Components/Confirm/Confirm";
import MyReview from "../../Components/MyReview/MyReview";
import Spinner from "../../Components/Spinner/Spinner";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { setTile } from "../../utils/setTitle";
import styles from "./MyReviews.module.css"

function MyReviews() {
	setTile('My Reviews');
	const [reviews, setReviews] = useState({});
	const { loading, unauthorized, setUnauthorized } = useContext(AuthContext);
	// const [unauthorized, setUnauthorized] = useState(false);

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
		<div className={styles.myReviewsContainer}>
			<h3 style={{ "textAlign": "center" }}>My Reviews</h3>
			{
				unauthorized ? <h3>Unauthorized Access. Please try to re-<Link to="/login">login</Link>.</h3> : ''
			}
			<div className={styles.spinnerContainer}>
				{
					loading ? <Spinner /> : ''
				}
			</div>

			<div className={styles.reviewsContainer}>
				{
					(Object.keys(reviews).length) ?
						reviews.map(review => <MyReview key={review._id} review={review} />)
						: ''
				}

			</div>
		</div>
	);
}

export default MyReviews;