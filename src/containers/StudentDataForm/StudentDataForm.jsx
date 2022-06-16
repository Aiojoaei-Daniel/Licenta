import React, { useState } from "react";

// import { Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

import InputGroupSelect from "../../components/InputGroupSelect";
import postsType from "../../utils/postsType";
import Alert from "../../components/Alert/Alert";

import { db } from "../../firebase-config";
import { useAuth } from "./../../contexts/AuthContext";

import imgRegister from "../../images/posts/imgPosts2.png";
import "./studentRegister.css";

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
    console.log(students);
    students.map((student) => {
      if (student.email === studentEmail) {
        studentInDataBase = true;
        setError("Acest email a fost deja înregistrat.");
      }
    });
    if (
      // !currentUser &&
      !studentInDataBase &&
      studentData.specialization !== undefined &&
      studentData.specialization !== "Alege tipul postării..." &&
      studentData.group !== "Alege tipul postării..." &&
      studentData.group !== undefined
    ) {
      await addDoc(studentsCollectionRef, studentData);
      history.push("/");
    } else if (!studentInDataBase) setError("Date incomplete sau greșite.");
  };

  return (
    <>
      <h2 className="title" id="student-form">
        Date despre student
      </h2>
      {error && <Alert error={error} />}
      <div className="register-body">
        <form className="student-form">
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
            className="btn register-btn"
            onClick={registerStudent}
          >
            Înregistrează student
          </button>
          <Link to="/" className="btn cancel">
            Anulează
          </Link>
        </form>
        <img src={imgRegister} className="register-img" alt="" />
      </div>
    </>
  );
}

export default StudentDataForm;
