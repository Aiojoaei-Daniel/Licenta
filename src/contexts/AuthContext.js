import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentStudent, setCurrentStudent] = useState({});

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function setStudentInLocalStorage(student) {
    console.log("In setLocal Storage", student, currentStudent);
    localStorage.setItem("email", JSON.stringify(student.email));
    localStorage.setItem("group", JSON.stringify(student.group));
    localStorage.setItem(
      "specialization",
      JSON.stringify(student.specialization)
    );
    localStorage.setItem("id", JSON.stringify(student.id));
    console.log("Email", localStorage.getItem("email"));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    const student = {
      email: JSON.parse(localStorage.getItem("email")),
      group: JSON.parse(localStorage.getItem("group")),
      specialization: JSON.parse(localStorage.getItem("specialization")),
    };
    setCurrentStudent(student);

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    currentStudent,
    setCurrentStudent,
    setStudentInLocalStorage,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
