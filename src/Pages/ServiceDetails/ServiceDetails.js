import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import styles from "./ServiceDetails.module.css";
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider'
import Review from "../../Components/Review/Review";
import { setTile } from "../../utils/setTitle";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
import { FiUser } from "react-icons/fi";
import { toast } from "react-hot-toast";

function ServiceDetails() {
	const id = useParams().id;
	const location = useLocation();
	const [service, setService] = useState({});
	const [reviews, setReviews] = useState([]);
	const [sendingReview, setSendingReview] = useState(false);
	const [loading, setLoading] = useState(true);
	const [des, setDes] = useState(true);
	const { user } = useContext(AuthContext);

	setTile(`Service Details - ${service.name}`);

	const { name, details, image, price } = service;

	// gets service details
	useEffect(() => {
		fetch(`http://localhost:5000/services/${id}`)
			.then(res => res.json())
			.then(data => {
				setService(data);
				setLoading(false);
			});
	}, [id]);

	// gets descending by time reviews by default
	useEffect(() => {
		fetch(`http://localhost:5000/reviews/${id}`, {
			headers: {
				"descending": des
			}
		})
			.then(res => res.json())
			.then(data => setReviews(data));
	}, [id, des]);

	const handleReviewSubmit = e => {
		setSendingReview(true);
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
				"authorization": `Bearer ${user.accessToken}`,
				"uid": user.uid
			},
			body: JSON.stringify(newReview)
		})
			.then(res => res.json())
			.then(data => {
				if (data.message === 'Unauthorized Access') {
					toast.error('An error occurred. Please try again.')
					setSendingReview(false);
				} else {
					const newArray = [...reviews];
					newArray.unshift(newReview);
					setReviews(newArray);
					setSendingReview(false);
					toast.success('Successfully added review');
					e.target.addReview.value = '';
				}
			});
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<Header />
			<div className={styles.container} style={{ flexGrow: 1 }}>
				<h3 className={styles.title}>Service Details</h3>
				{/* shows spinner while the data is being loaded */}
				{loading ? <div style={{ "display": "flex", "justifyContent": "center" }}><Spinner /></div> : ''}

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

								<div style={{ "display": "flex", "gap": "10px", "alignItems": "center" }}>
									<label htmlFor="sort">Sort by time:</label>
									<select onChange={() => setDes(!des)} name="sort" id="sort-by-time" style={{ "fontSize": "0.95rem" }}>
										<option value="des">Descending</option>
										<option value="asc">Ascending</option>
									</select>
								</div>

								{/* user can add comments here */}
								<div>
									{
										!user ? <p>Please <Link to="/login" state={{ from: location }} replace>login</Link> to submit review.</p>
											:
											<div className={styles.addReviewContainer}>
												{
													user && user.photoURL && <img src={user.photoURL} alt={user.displayName} className={styles.userImage} />
												}
												{
													user && !user.photoURL && <span style={{ fontSize: '2rem' }}><FiUser /></span>
												}
												<form onSubmit={handleReviewSubmit} className={styles.addReviewForm} id="reviewForm">
													<textarea className={styles.addReviewField} name="addReview" id="addReview" rows="3" form="reviewForm" required></textarea>
													<div>
														<input type="submit" value="Add Review" className={styles.reviewSubmit} disabled={sendingReview} />
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
			<Footer />
		</div>
	);
}

export default ServiceDetails;