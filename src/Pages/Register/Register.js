import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import styles from "./Register.module.css";

function Register() {
  const { register } = useContext(AuthContext);

  const handleRegister = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await register(email, password);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <h3 className={styles.formTitle}>Register</h3>

      <div className={styles.fieldContainer}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div className={styles.fieldContainer}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>

      <div className={styles.fieldContainer}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>

      <input className={styles.loginButton} type="submit" value="Register" />
    </form>
  );
}

export default Register;
