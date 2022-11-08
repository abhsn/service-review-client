import React, { useEffect, useState } from "react";
import Services from "../../Components/Services/Services";
import Spinner from "../../Components/Spinner/Spinner";
import styles from "./Home.module.css";

function Home() {
  const [services, setServices] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/services', {
      method: "GET",
      headers: {
        "isshort": true
      }
    })
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <React.Fragment>
      {!services ?
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div> : ''
      }
      {services ?
        <Services services={services} /> : ''
      }
    </React.Fragment>
  );
}

export default Home;
