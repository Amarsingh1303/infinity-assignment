import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { useDispatch } from "react-redux";
import { setUser } from "./userReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [err, setErr] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      user_name: user_name,
      password: password,
      role,
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.msg.msgError === true) {
          setErr(res.msg.msgBody);
          localStorage.setItem("access_token", "invalid");
        } else {
          fetch(`${process.env.REACT_APP_BASE_URL}/`, {
            headers: {
              Authorization: res?.token,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log("res", res);
              dispatch(setUser(res));
              if (res.role === "customer") {
                navigate("/customer");
              } else if (res.role === "employee" && res.isAdmin === true) {
                navigate("/admin");
              } else {
                navigate("/employee");
              }
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setPassword("");
    setUser_name("");
    setRole("");
  };
  return (
    <div className="container">
      {err ? <Alert message={err} clear={() => setErr()} /> : null}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user_name">UserName</label>
          <input
            type="text"
            className="form-control"
            id="user_name"
            placeholder="Enter UserName"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
            }}
            id="role"
          >
            <option>Select Role</option>
            <option value="customer">Customer</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Link to="/signup">
        <div>New User? Click here to Signup</div>
      </Link>
    </div>
  );
}

export default Login;
