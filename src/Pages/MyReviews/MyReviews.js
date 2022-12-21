import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import MyReview from "../../Components/MyReview/MyReview";
import Spinner from "../../Components/Spinner/Spinner";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { setTile } from "../../utils/setTitle";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import styles from "./MyReviews.module.css"

function MyReviews() {
	setTile('My Reviews');
	const [reviews, setReviews] = useState([]);
	const { loading, user, unauthorized, setUnauthorized, logOut } = useContext(AuthContext);
	const [loadingReview, setLoadingReview] = useState(true);
	const navigate = useNavigate();

	const handleRelogin = () => {
		logOut()
			.then(() => {
				navigate('/login');
			})
	}

	const id = useParams().id;

	useEffect(() => {
		fetch(`https://service-review-server-vert.vercel.app/my-reviews/${id}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.message === 'Unauthorized Access' || data.message === 'Forbidden') {
					setUnauthorized(true);
					setLoadingReview(false);
				} else {
					setReviews(data);
					setLoadingReview(false);
					setUnauthorized(false);
				}
			});
	}, [id]);
	return (
		<div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header />
			<div className={styles.myReviewsContainer} style={{ flexGrow: 1 }}>
				<h3 style={{ "textAlign": "center" }}>My Reviews</h3>
				{
					unauthorized ? <h3 style={{ textAlign: 'center' }}>Unauthorized Access. Please try to re-<Link onClick={handleRelogin}>login</Link>.</h3> : ''
				}
				{
					!setLoadingReview && reviews.length === 0 && <p style={{ "textAlign": "center" }}>Nothing to show</p>
				}
				<div className={styles.spinnerContainer}>
					{
						loading && <Spinner />
					}
				</div>

				<div className={styles.reviewsContainer}>
					{
						(reviews.length) ?
							reviews.map(review => <MyReview key={review._id} review={review} setReviews={setReviews} reviews={reviews} />) : <></>
					}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default MyReviews;