import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import Confirm from "../Confirm/Confirm";
import RemoveConfirm from "../RemoveConfirm/RemoveConfirm";
import styles from './MyReview.module.css';

// review -> comment
// reviewDetails -> details of service

function MyReview({ review, reviews, setReviews }) {
	const [newReview, setNewReview] = useState({ ...review });
	const [reviewDetails, setReviewDetails] = useState({});
	const [edit, setEdit] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [remove, setRemove] = useState(false);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		fetch(`https://service-review-server-nrebl34n9-abhsn.vercel.app/services/${review.serviceId}`)
			.then(res => res.json())
			.then(data => setReviewDetails(data));
	}, [review]);

	const handleEditSubmit = e => {
		e.preventDefault();
		const editedComment = e.target.editField.value;
		fetch(`https://service-review-server-nrebl34n9-abhsn.vercel.app/edit-review/${review._id}`, {
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
					toast.success('Successfully edited review');
				};
			});
	}

	return (
		<div className={styles.myReviewContainer}>
			<h3>{reviewDetails.name}</h3>
			<p>{newReview.comment}</p>
			<div className={styles.editButtonContainer}>
				<button onClick={() => setEdit(true)} className={styles.editButton}>Edit</button>
				<button onClick={() => setRemove(true)} className={styles.editButton}>Delete</button>
			</div>
			{
				edit ?
					<React.Fragment>
						<form className={styles.reviewEditForm} onSubmit={handleEditSubmit}>
							<textarea name="editField" placeholder={newReview.comment} id={review._id} cols="30" rows="4" className={styles.editField} required></textarea>
							<div className={styles.editSubmitButtonContainer}>
								<input type="submit" value="Submit" className={styles.submitButton} />
								<button onClick={() => {
									setConfirm(true);
								}} className={styles.cancelButton}>Cancel</button>
							</div>
						</form>
						{confirm ? <Confirm setConfirm={setConfirm} setEdit={setEdit} /> : ''}
					</React.Fragment>
					: ''
			}
			{remove ? <RemoveConfirm setRemove={setRemove} review={review} reviews={reviews} setReviews={setReviews} /> : ''}
		</div >
	);
}

export default MyReview;