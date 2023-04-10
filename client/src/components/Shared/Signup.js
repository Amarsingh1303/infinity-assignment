import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";

function SignUp() {
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      user_name,
      email,
      password,
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((res) => res.json())
      .then((res) => setErr(res.msg.msgBody))
      .catch((err) => console.log(err));
    setEmail("");
    setPassword("");
    setUser_name("");
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Link to="/login">
        <div>Click Here to Login</div>
      </Link>
    </div>
  );
}

export default SignUp;
