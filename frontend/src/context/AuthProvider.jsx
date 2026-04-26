import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uidRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(uidRef);

          if (docSnap.exists()) {
            setCurrentUser({
              uid: user.uid,
              phoneNumber: user.phoneNumber,
              ...docSnap.data(),
            });
          } else {
            // fall back if fails
            const phoneRef = doc(db, "users", user.phoneNumber);
            const phoneSnap = await getDoc(phoneRef);

            if (phoneSnap.exists()) {
              const data = phoneSnap.data();

              await setDoc(uidRef, {
                ...data,
                phoneNumber: user.phoneNumber,
              });

              setCurrentUser({
                uid: user.uid,
                phoneNumber: user.phoneNumber,
                ...data,
              });
            }else {
              // fallback
              setCurrentUser({
                uid: user.uid,
                phoneNumber: user.phoneNumber,
              });
            }
          }
        } catch (err) {
          console.log("Error fetching the user details: ", err);
        }
      } else {
        setCurrentUser(null);
      }

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
