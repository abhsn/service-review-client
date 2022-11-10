import { createContext, useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [unauthorized, setUnauthorized] = useState(false);

	const logIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const register = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	}

	const logOut = () => {
		return signOut(auth);
	};

	const updateUserProfile = (name, url) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: url
		});
	}

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, currentUser => {
			setLoading(false);
			currentUser ? setUser(currentUser) : setUser(null);
		});


		return () => unSubscribe;
	}, []);

	const authinfo = { logIn, googleSignIn, user, setUser, logOut, register, loading, unauthorized, setUnauthorized, updateUserProfile };

	return (
		<AuthContext.Provider value={authinfo}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
