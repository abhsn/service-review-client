import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import styles from "./ServiceDetails.module.css";
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider'
import Review from "../../Components/Review/Review";

function ServiceDetails() {
	const id = useParams().id;
	const [service, setService] = useState({});
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useContext(AuthContext);

	const { name, details, image, price } = service;

	useEffect(() => {
		fetch(`http://localhost:5000/services/${id}`)
			.then(res => res.json())
			.then(data => {
				setService(data);
				setLoading(false);
			});
	}, [id]);

	useEffect(() => {
		fetch(`http://localhost:5000/reviews/${id}`)
			.then(res => res.json())
			.then(data => setReviews(data));
	}, [id]);

	const handleReviewSubmit = e => {
		e.preventDefault();
		const date = new Date();
		const newReview = {
			comment: e.target.addReview.value,
			uid: user.uid,
			name: user.displayName,
			time: date.getTime(),
			serviceId: service._id,
			image: user.photoURL
		}
		fetch(`http://localhost:5000/add-review`, {
			method: 'POST',
			headers: {
				"content-type": "application/json",
				"authorization": `Bearer ${localStorage.getItem('token')}`,
				"uid": user.uid
			},
			body: JSON.stringify(newReview)
		})
			.then(res => res.json())
			.then(data => {
				if (data.message === 'Unauthorized Access') {
					console.log('unsuccessful')
				} else {
					const newArray = [...reviews];
					newArray.unshift(newReview);
					setReviews(newArray);
				}
			});
	}

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Service Details</h3>
			{/* shows spinner while the data is being loaded */}
			{loading ? <Spinner /> : ''}

			{/* service details section */}
			{
				!loading ?
					<React.Fragment>
						{/* service details */}
						<section className={styles.serviceDetailsContainer}>
							<div className={styles.serviceTextContainer}>
								<h3>{name}</h3>
								<p>{details}</p>
								<small>Price: <strong>${price}</strong></small>
							</div>
							<div className={styles.serviceImageContainer} >
								<img src={image} alt={name} className={styles.serviceImage} />
							</div>
						</section>

						{/* service reviews */}
						<section className={styles.reviewsContainer}>
							<h4>Reviews</h4>

							{/* user can add comments here */}
							<div>
								{
									!user ? <p>Please <Link to="/login">login</Link> to submit review.</p>
										:
										<div className={styles.addReviewContainer}>
											<img src={user.photoURL} alt={user.displayName} className={styles.userPhoto} />
											<form onSubmit={handleReviewSubmit} className={styles.addReviewForm} id="reviewForm">
												<textarea className={styles.addReviewField} name="addReview" id="addReview" rows="3" form="reviewForm" required></textarea>
												<div>
													<input type="submit" value="Add Review" className={styles.reviewSubmit} />
												</div>
											</form>
										</div>
								}
							</div>
							<div className={styles.reviews}>
								{
									reviews.map(review => <Review key={review._id} review={review} />)
								}
							</div>
						</section>
					</React.Fragment>
					: ''
			}
		</div>
	);
}

export default ServiceDetails;