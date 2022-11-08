import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import "./Login.module.css";
import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const { logIn, googleSignIn } = useContext(AuthContext);

  const handleLogIn = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const result = await logIn(email, password);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleLogIn = async () => {
    try {
      const result = await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
      <h3 className={styles.formTitle}>Login</h3>
      <div className={styles.emailContainer}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className={styles.passwordContainer}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div className={styles.buttonContainer}>
        <div>
          <input onClick={handleLogIn} className={styles.loginButton} type="submit" value="Login" />
        </div>
        <small>or</small>
        <div>
          <button onClick={handleGoogleLogIn} className={styles.loginButton}><span className={styles.googleButton}><FcGoogle /></span>Login with Google</button>
        </div>
      </div>
    </form>
  );
}

export default Login;
