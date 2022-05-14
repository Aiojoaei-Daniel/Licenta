import React, { useState, useEffect } from "react";

import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import InputGroupSelect from "../../components/common/InputGroupSelect";
import PostTypes from "../../components/common/PostTypes";

import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

function StudentDataForm(props) {
  const studentsCollectionRef = collection(db, "students");
  const { years: groups, specializations } = PostTypes();

  const [studentEmail, setStudentEmail] = useState("");
  const [studentGroup, setStudentGroup] = useState();
  const [studentSpecialization, setStudentSpecialization] = useState("");
  const [error, setError] = useState();
  const history = useHistory();

  const registerStudent = async (event) => {
    event.preventDefault();
    try {
      await addDoc(studentsCollectionRef, {
        email: studentEmail,
        group: studentGroup,
        specialization: studentSpecialization,
      });
      history.push("/");
    } catch (error) {
      setError("Register failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ maxWidth: "2000px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Student Data</h2>
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
