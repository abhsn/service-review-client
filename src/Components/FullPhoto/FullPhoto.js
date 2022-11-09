import styles from './FullPhoto.module.css';

function FullPhoto({ image, name, setFullPhoto, id }) {
	const top = document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight;
	const imageTop = (window.innerHeight * 0.2 / 2) + top;
	const closePosition = imageTop - 36;

	return (
		<div className={styles.photoContainer} id={id} style={{ height: height }}>
			<img src={image} alt={name} className={styles.image} style={{ "top": imageTop }} />
			<button className={styles.closeButton} onClick={() => setFullPhoto(false)} style={{ "top": closePosition }}>✕</button >
		</div >
	);
}

export default FullPhoto;