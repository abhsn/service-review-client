import React from "react";
import styles from "./Service.module.css";

function Service({ service }) {
  const { name, image, details, price } = service;
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
        <img src={image} alt="" className={styles.image} />
        <p>{details}</p>
        <small>Price: <strong>${price}</strong></small>
      </div>
    </React.Fragment >
  );
}

export default Service;
