import React, { useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentStudent, setCurrentStudent] = useState({});
  const [students, setStudents] = useState([]);
  const studentsCollectionRef = collection(db, "students");

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
    localStorage.setItem("email", JSON.stringify(student.email));
    localStorage.setItem("group", JSON.stringify(student.group));
    localStorage.setItem(
      "specialization",
      JSON.stringify(student.specialization)
    );
    localStorage.setItem("id", JSON.stringify(student.id));
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
    setCurrentStudent(student.email !== null ? student : {});

    const getStudents = async () => {
      const students = await getDocs(studentsCollectionRef);

      setStudents(students.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getStudents();

    return unsubscribe;
  }, []);

  const value = {
    signup,
    login,
    logout,
    students,
    currentUser,
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
