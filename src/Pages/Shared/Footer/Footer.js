import styles from "./Footer.module.css";
import { ImFacebook, ImBehance } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";

function Footer() {
	return (
		<section className={styles.footerContainer}>
			<p>Follow me</p>
			<div style={{
				"fontSize": "1.5rem",
				"display": "flex",
				"gap": "20px"
			}}>
				<ImFacebook />
				<BsInstagram />
				<FaPinterestP />
				<ImBehance />
			</div>
			<small>Copyleft 🄯 2022. This is website is licensed under GPLv3+. You can modify as you want.</small>
		</section>
	);
}

export default Footer;