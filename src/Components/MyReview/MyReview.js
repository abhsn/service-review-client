import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import styles from './MyReview.module.css';

// review -> comment
// reviewDetails -> details of service

function MyReview({ review }) {
	const [newReview, setNewReview] = useState({ ...review });
	const [reviewDetails, setReviewDetails] = useState({});
	const [edit, setEdit] = useState(false);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		fetch(`http://localhost:5000/services/${review.serviceId}`)
			.then(res => res.json())
			.then(data => setReviewDetails(data));
	}, [review]);

	const handleEditSubmit = e => {
		e.preventDefault();
		const editedComment = e.target.editField.value;
		fetch(`http://localhost:5000/edit-review/${review._id}`, {
			method: 'PUT',
			headers: {
				"content-type": "application/json",
				"authorization": `Bearer ${localStorage.getItem('token')}`,
				"userId": `${user.uid}`,
			},
			body: JSON.stringify({ newComment: editedComment, commentId: review._id })
		})
			.then(res => res.json())
			.then(data => {
				if (data.acknowledged) {
					const newObj = { ...newReview };
					newObj.comment = editedComment;
					setNewReview(newObj);
				};
			});
	}

	return (
		<div className={styles.myReviewContainer}>
			<h3>{reviewDetails.name}</h3>
			<p>{newReview.comment}</p>
			<div className={styles.editButtonContainer}>
				<button onClick={() => setEdit(true)} className={styles.editButton}>Edit</button>
			</div>
			{
				edit ?
					<form className={styles.reviewEditForm} onSubmit={handleEditSubmit}>
						<textarea name="editField" placeholder={newReview.comment} id={review._id} cols="30" rows="4" className={styles.editField} required></textarea>
						<div className={styles.editSubmitButtonContainer}>
							<input type="submit" value="Submit" className={styles.submitButton} />
							<button onClick={() => setEdit(false)} className={styles.cancelButton}>Cancel</button>
						</div>
					</form>
					: ''
			}
		</div >
	);
}

export default MyReview;