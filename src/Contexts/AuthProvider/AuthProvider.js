import { createContext } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const authinfo = {};
  return (
    <AuthContext.Provider value={authinfo}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
