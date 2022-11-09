import { Link } from "react-router-dom";
import { setTile } from "../../utils/setTitle";
import Service from "../Service/Service";
import styles from "./Services.module.css";

function Services({ services }) {
	setTile('Services');
	return (
		<section className={styles.servicesContainer}>
			<h3 className={styles.title}>Our Services</h3>
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