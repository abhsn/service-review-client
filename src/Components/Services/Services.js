import { Link } from "react-router-dom";
import { setTile } from "../../utils/setTitle";
import Service from "../Service/Service";
import styles from "./Services.module.css";

function Services({ services }) {
	return (
		<section className={styles.servicesContainer}>
			<div className={styles.title}>
				<div></div>
				<h3>My Services</h3>
			</div>
			<div className={styles.serviceContainer}>
				{
					services.map(service => <Service key={service._id} service={service} />)
				}
			</div>
			<div className={styles.showMoreContainer}>
				<Link className={styles.showMore} to="/services">Show more</Link>
			</div>
		</section>
	);
}

export default Services;