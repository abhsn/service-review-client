import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import styles from "./AddService.module.css";

function AddService() {
	const { user } = useContext(AuthContext);
	const handleAddService = e => {
		e.preventDefault();
		const form = e.target;
		const title = form.title.value;
		const url = form.url.value;
		const details = form.details.value;
		const price = form.price.value;
		const service = {
			name: title,
			details: details,
			image: url,
			price: price
		}
		fetch('https://service-review.onrender.com/add-service', {
			method: 'POST',
			headers: {
				"content-type": "application/json",
				"authorization": `Bearer ${localStorage.getItem('token')}`,
				"uid": user.uid
			},
			body: JSON.stringify(service)
		})
		form.reset();
	}
	return (
		<div>
			<Header />
			<div className={styles.addServiceContainer}>
				<h3>Add Custom Service</h3>
				<form onSubmit={handleAddService} className={styles.addServiceForm}>
					<input className={styles.addServiceField} type="text" name="title" id="" placeholder="Service Title" required />
					<input className={styles.addServiceField} type="url" name="url" id="" placeholder="Service Image" required />
					<textarea className={styles.textarea} type="text" name="details" id="" placeholder="Service Details" required />
					<input className={styles.addServiceField} type="number" name="price" id="" placeholder="Service Price" required />
					<div className={styles.submitButtonContainer}>
						<input className={styles.submitButton} type="submit" value="Add Service" />
					</div>
				</form>
			</div>
			<Footer />
		</div>
	);
}

export default AddService;