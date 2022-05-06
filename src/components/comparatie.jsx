import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import Button from "@mui/material/Button";
import Form from "./components/common/Form";
import Register from "./components/common/Register";
import Login from "./components/Login";
import { db } from "./firebase-config";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState([{ email: null, password: null }]);

  const userCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(userCollectionRef, newUser[0]);
  };

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);
    const update = { password: "Updated" };

    await updateDoc(userDoc, update);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const users = await getDocs(userCollectionRef);

      setUsers(users.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div>
      <Register />
      <input
        className="form-control"
        placeholder="Email:"
        onChange={(event) => {
          newUser.map((user) => {
            setNewUser([
              { email: event.target.value, password: user.password },
            ]);
          });
        }}
      />
      <input
        className="form-control"
        placeholder="Password:"
        onChange={(event) => {
          newUser.map((user) => {
            setNewUser([{ email: user.email, password: event.target.value }]);
          });
        }}
      />

      <button onClick={createUser}> Create a User</button>
      <div>
        {users &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <h1 key={user.email}>{user.email}</h1>
                <h1 key={user.password}>{user.password}</h1>
                <Button
                  onClick={() => {
                    updateUser(user.id);
                  }}
                  variant="contained"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete User
                </Button>
              </div>
            );
          })}
      </div>

      <form>
        <div class="form-group">
          <label for="InputUsername">Username</label>
          <input
            type="text"
            class="form-control"
            id="InputUsername"
            placeholder="Username"
          />
        </div>
        <div class="form-group">
          <label for="InputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="InputEmail1"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="InputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="InputPassword1"
            placeholder="Password"
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="Check1" />
          <label class="form-check-label" for="Check1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default App;

// !login

const userCollectionRef = collection(db, "users");

useEffect(() => {
  const getUsers = async () => {
    const users = await getDocs(userCollectionRef);

    setUsers(users.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  getUsers();
}, []);

const checkUser = () => {};

const handleChange = (event, item) => {
  setUser({
    ...user,
    [item]: event.target.value,
  });
};

// const createUser = async () => {
//   await addDoc(userCollectionRef, newUser);
// };

// const updateUser = async (id) => {
//   const userDoc = doc(db, "users", id);
//   const update = { password: "Updated" };

//   await updateDoc(userDoc, update);
// };

// const deleteUser = async (id) => {
//   const userDoc = doc(db, "users", id);
//   await deleteDoc(userDoc);
// };
