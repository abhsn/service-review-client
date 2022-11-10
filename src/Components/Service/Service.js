import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FullPhoto from "../FullPhoto/FullPhoto";
import styles from "./Service.module.css";

function Service({ service }) {
	const { name, image, details, price, _id } = service;
	const [fullPhoto, setFullPhoto] = useState(false);

	useEffect(() => {
		const top = document.documentElement.scrollTop;
		if (fullPhoto) {
			window.onscroll = () => window.scrollTo(0, top);
		} else {
			window.onscroll = () => { };
		}
	}, [fullPhoto]);

	return (
		<React.Fragment>
			{/* <style dangerouslySetInnerHTML={{ */}
			{/*   __html: [`.${styles.service}:hover {`, */}
			{/*     'box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);', */}
			{/*     `}`].join('\n') */}
			{/* }}> */}
			{/* </style> */}

			<div className={styles.service}>
				<h4>{name}</h4>
				<img onClick={() => setFullPhoto(true)} src={image} alt="" className={styles.image} />
				{
					fullPhoto ? <FullPhoto id={_id} name={name} image={image} fullPhoto={fullPhoto} setFullPhoto={setFullPhoto} /> : <React.Fragment></React.Fragment>
				}
				<p>{`${details.length > 100 ? details.split('').splice(0, 100).join('') + '...' : details}`}</p>
				<small>Price: <strong>${price}</strong></small>
				<Link className={styles.detailsButton} to={`/services/${_id}`}>Details</Link>
			</div>
		</React.Fragment >
	);
}

export default Service;