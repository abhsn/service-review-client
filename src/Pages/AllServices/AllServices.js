import React, { useEffect, useState } from "react";
import Service from "../../Components/Service/Service";
import Spinner from "../../Components/Spinner/Spinner";
import { setTile } from "../../utils/setTitle";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import styles from "./AllServices.module.css";

function AllServices() {
	setTile('Services');
	const [services, setServices] = useState(false);

	useEffect(() => {
		fetch('https://service-review.onrender.com/services')
			.then(res => res.json())
			.then(data => setServices(data));
	}, []);

	return (
		<React.Fragment>
			<Header />
			<h3 className={styles.title}>All Services</h3>
			{
				!services ?
					<div className={styles.spinnerContainer}>
						<Spinner />
					</div>
					:
					<section className={styles.serviceContainer}>
						{
							services.map(service => <Service key={service._id} service={service} />)
						}
					</section>
			}
			<Footer />
		</React.Fragment>
	);
}

export default AllServices;
