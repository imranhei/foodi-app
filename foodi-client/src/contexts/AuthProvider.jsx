import React, { useState, createContext, useEffect } from "react";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //create an account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  };

  // signup with gmail account
  const signUpWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // login using email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logout = () => {
    signOut(auth);
  }

  // check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {

      }
    });
    return () => {
      return unsubscribe();
    }
  }, []);

  // update profile
  const updateProfile = (name, [photoURL]) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  }

  const authInfo = { user, createUser, signUpWithGoogle, login, logout, updateProfile, loading };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
