import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, logout, setCurrentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};