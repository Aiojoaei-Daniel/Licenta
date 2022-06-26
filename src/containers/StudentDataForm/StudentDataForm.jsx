import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { Form } from "react-bootstrap";

import { db } from "../../firebase-config";
import { getDocs } from "firebase/firestore";
import { useAuth } from "./../../contexts/AuthContext";

import InputGroupSelect from "../../components/InputGroupSelect";
import postsType from "../../utils/postsType";
import Alert from "../../components/Alert/Alert";

import imgRegister from "../../images/posts/imgPosts2.png";
import "./studentRegister.css";

function StudentDataForm() {
  const studentsCollectionRef = collection(db, "students");
  const { years: groups, specializations } = postsType();
  const history = useHistory();

  const [studentEmail, setStudentEmail] = useState("");
  const [studentGroup, setStudentGroup] = useState();
  const [students, setStudents] = useState([]);
  const [studentSpecialization, setStudentSpecialization] = useState();
  const [error, setError] = useState();
  // const { students } = useAuth();

  useEffect(() => {
    const getStudents = async () => {
      const students = await getDocs(studentsCollectionRef);

      setStudents(students.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getStudents();
  }, [studentEmail]);

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
      studentEmail.length > 5 &&
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
        Informații despre student
      </h2>
      {error && <Alert error={error} />}
      <div className="register-body">
        <form className="student-form">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            className="form-control"
            placeholder="Email student..."
            onChange={(event) => setStudentEmail(event.target.value)}
          />
          <InputGroupSelect
            values={groups}
            onChange={(event) => setStudentGroup(event.target.value)}
            label="Grupă"
            defaultValue="grupa"
          />
          <InputGroupSelect
            values={specializations}
            onChange={(event) => setStudentSpecialization(event.target.value)}
            label="Specializare"
            defaultValue="specializarea"
          />
          <button
            type="submit"
            className="btn register-btn"
            onClick={registerStudent}
          >
            Abonează-te
          </button>
        </form>
        <img src={imgRegister} className="register-img" alt="" />
      </div>
    </>
  );
}

export default StudentDataForm;
