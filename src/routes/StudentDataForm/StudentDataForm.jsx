import React, { useState } from "react";

import { Card, Alert } from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import InputGroupSelect from "../../components/common/InputGroupSelect";
import PostTypes from "../../components/common/PostTypes";

import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

import { useAuth } from "./../../contexts/AuthContext";

function StudentDataForm() {
  const studentsCollectionRef = collection(db, "students");
  const { years: groups, specializations } = PostTypes();
  const history = useHistory();

  const [studentEmail, setStudentEmail] = useState("");
  const [studentGroup, setStudentGroup] = useState();
  const [studentSpecialization, setStudentSpecialization] = useState();
  const [error, setError] = useState();
  const {
    students,
    currentStudent,
    setCurrentStudent,
    setStudentInLocalStorage,
  } = useAuth();

  const registerStudent = async (event) => {
    event.preventDefault();
    let studentInDataBase = false;
    const studentData = {
      email: studentEmail,
      group: studentGroup,
      specialization: studentSpecialization,
    };
    students.map((student) => {
      if (student.email === studentEmail) {
        studentInDataBase = true;
        setError("This email is already registered");
      }
    });
    if (
      // !currentUser &&
      !studentInDataBase &&
      Object.keys(currentStudent).length === 0 &&
      studentData.specialization !== undefined &&
      studentData.specialization !== "Choose..." &&
      studentData.group !== "Choose..." &&
      studentData.group !== undefined
    ) {
      await addDoc(studentsCollectionRef, studentData);
      setCurrentStudent(studentData);
      setStudentInLocalStorage(studentData);
      history.push("/");
    } else if (!studentInDataBase) setError("Already connected or wrong data.");
  };

  return Object.keys(currentStudent).length !== 0 ? (
    <Redirect to="/" />
  ) : (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ maxWidth: "2000px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Student Data</h2>
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

            <InputGroupSelect
              values={groups}
              onChange={(event) => setStudentGroup(event.target.value)}
              label="Group"
            />
            <InputGroupSelect
              values={specializations}
              onChange={(event) => setStudentSpecialization(event.target.value)}
              label="Specialization"
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={registerStudent}
            >
              Save data
            </button>
            <Link to="/" className="btn btn-dark">
              Cancel
            </Link>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default StudentDataForm;
