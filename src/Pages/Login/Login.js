import "./Login.module.css";
import styles from "./Login.module.css";

function Login() {
  return (
    <form className={styles.form}>
      <h3 className={styles.formTitle}>Login</h3>
      <div className={styles.emailContainer}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className={styles.passwordContainer}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div>
        <input className={styles.loginButton} type="submit" value="Login" />
      </div>
    </form>
  );
}

export default Login;
