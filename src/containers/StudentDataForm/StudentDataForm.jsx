import React, { useState } from "react";

import { Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

import InputGroupSelect from "../../components/InputGroupSelect";
import postsType from "../../utils/postsType";

import { db } from "../../firebase-config";
import { useAuth } from "./../../contexts/AuthContext";

function StudentDataForm() {
  const studentsCollectionRef = collection(db, "students");
  const { years: groups, specializations } = postsType();
  const history = useHistory();

  const [studentEmail, setStudentEmail] = useState("");
  const [studentGroup, setStudentGroup] = useState();
  const [studentSpecialization, setStudentSpecialization] = useState();
  const [error, setError] = useState();
  const { students } = useAuth();

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
      studentData.specialization !== undefined &&
      studentData.specialization !== "Choose..." &&
      studentData.group !== "Choose..." &&
      studentData.group !== undefined
    ) {
      await addDoc(studentsCollectionRef, studentData);
      history.push("/");
    } else if (!studentInDataBase) setError("Already connected or wrong data.");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ maxWidth: "2000px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Date despre student</h2>
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
              label="Grupă"
            />
            <InputGroupSelect
              values={specializations}
              onChange={(event) => setStudentSpecialization(event.target.value)}
              label="Specializare"
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={registerStudent}
            >
              Înregistrează student
            </button>
            <Link to="/" className="btn btn-dark">
              Anulează
            </Link>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default StudentDataForm;
