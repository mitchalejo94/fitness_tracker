import React, { useState } from "react";
import { registerUser } from "../api/api";
import loginUser from "../api/api";
import { useHistory } from "react-router-dom";

const AccountForm = ({ setToken, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (username, password) => {
    const returningUser = await loginUser(username, password);
    setUser(returningUser.user.username);
    setToken(returningUser.token);
    setUsername("");
    setPassword("");
    alert(returningUser.message);
    history.push("/");
  };
  const handleRegister = async (username, password) => {
    const newUser = await registerUser(username, password);
    if (newUser) {
      setUser(newUser.username);
      setToken(newUser.token);
      setUsername("");
      setPassword("");
      alert(newUser.message);
      history.push("/");
    }
  };

  return (
    <>
      <div className="ui card fluid">
        <form
          className="ui form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h1 className="centered ui header">Login or Register</h1>
          <div className="field">
            <label className="loginheader">Username</label>
            <input
              type="text"
              value={username}
              placeholder="username"
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="password"
              minLength="8"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            className="ui button"
            type="submit"
            onClick={() => {
              handleRegister(username, password);
            }}
          >
            Register
          </button>
          <button
            className="ui button"
            type="submit"
            onClick={() => {
              handleLogin(username, password);
            }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default AccountForm;
