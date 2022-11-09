import { useEffect, useState } from "react";
import styles from './MyReview.module.css';

// review -> comment
// reviewDetails -> details of service

function MyReview({ review }) {
	const [reviewDetails, setReviewDetails] = useState({});
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		fetch(`http://localhost:5000/services/${review.serviceId}`)
			.then(res => res.json())
			.then(data => setReviewDetails(data));
	}, [review]);

	const handleEditSubmit = e => {
		e.preventDefault();
		const editedComment = e.target.editField.value;
		console.log(editedComment);
		fetch(`http://localhost:5000/edit-review/${review._id}`, {
			method: 'PUT',
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ newCommet: editedComment })
		})
			.then(res => res.json())
			.then(data => console.log(data));
	}

	return (
		<div className={styles.myReviewContainer}>
			<h3>{reviewDetails.name}</h3>
			<p>{review.comment}</p>
			<div className={styles.editButtonContainer}>
				<button onClick={() => setEdit(true)} className={styles.editButton}>Edit</button>
			</div>
			{
				edit ?
					<form className={styles.reviewEditForm} onSubmit={handleEditSubmit}>
						<textarea name="editField" placeholder={review.comment} id={review._id} cols="30" rows="4" className={styles.editField}></textarea>
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