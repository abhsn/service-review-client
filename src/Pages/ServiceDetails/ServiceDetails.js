import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import styles from "./ServiceDetails.module.css";

function ServiceDetails() {
	const id = useParams().id;
	const [service, setService] = useState({});
	const [loading, setLoading] = useState(true);

	const { name, details, image, price } = service;

	useEffect(() => {
		fetch(`http://localhost:5000/services/${id}`)
			.then(res => res.json())
			.then(data => {
				setService(data);
				setLoading(false);
			});
	}, [id]);

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Service Details</h3>
			{/* shows spinner while the data is being loaded */}
			{loading ? <Spinner /> : ''}

			{/* service details section */}
			{
				service ?
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
					: ''
			}
		</div>
	);
}

export default ServiceDetails;