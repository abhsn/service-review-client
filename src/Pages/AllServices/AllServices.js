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
		fetch('https://service-review-server-nrebl34n9-abhsn.vercel.app/services')
			.then(res => res.json())
			.then(data => setServices(data));
	}, []);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<Header />
			<section style={{ flexGrow: 1 }}>
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
			</section>
			<Footer />
		</div>
	);
}

export default AllServices;
