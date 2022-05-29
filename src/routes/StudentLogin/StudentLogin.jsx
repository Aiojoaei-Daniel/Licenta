import React, { useState, useEffect } from "react";
import { Card, Alert } from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";

import { useAuth } from "./../../contexts/AuthContext";
import { db } from "../../firebase-config";

import { collection, getDocs } from "firebase/firestore";
import _ from "lodash";

function StudentLogin() {
  const studentsCollectionRef = collection(db, "students");

  const [students, setStudents] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [error, setError] = useState();
  const history = useHistory();
  const { currentStudent, setCurrentStudent, setStudentInLocalStorage } =
    useAuth();

  useEffect(() => {
    const getStudents = async () => {
      const students = await getDocs(studentsCollectionRef);

      setStudents(students.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getStudents();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    Object.keys(currentStudent).length === 0
      ? students.map((student) => {
          if (student.email === studentEmail) {
            setError("");
            setCurrentStudent(student);
            setStudentInLocalStorage(student);
            history.push("/");
          } else {
            setError("Fail to connect");
          }
        })
      : setError("Already connected");
  };

  return Object.keys(currentStudent).length === 0 ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ maxWidth: "2000px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Student Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form>
            <div className="form-group">
              <label htmlFor="title">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(event) => setStudentEmail(event.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login Student
            </button>
            <Link to="/" className="btn btn-dark">
              Cancel
            </Link>
            <div>
              <Link to="/student-register">Register</Link>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default StudentLogin;
