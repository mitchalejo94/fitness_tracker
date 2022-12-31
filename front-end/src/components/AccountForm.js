import React, {useState} from "react";
import {registerUser} from "../api/api";
import loginUser  from "../api/api";


const AccountForm = ({token, setToken, setUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  
  // const handleSubmit = async(username, password) => {
  //   if (!token) {
  //     const newUser = await registerUser(username, password)
  //     console.log("we are registering user", newUser);
  //     setUser(newUser.username)
  //     setToken(newUser.token);
  //     // alert(newUser.message);

  //   } else {
  //     const returningUser = await loginUser(username, password)
  //     console.log("We are logging in", returningUser);
  //     setUser(returningUser.username)
  //     setToken(returningUser.token)
  //   }

  //   setPassword("");
  //   setUsername("");
  // }

  const handleLogin = async(username, password) => {
    const returningUser = await loginUser(username, password)
    console.log("We are returning", returningUser);
    setUser(returningUser.username)
    setToken(returningUser.token)
    setUsername("")
    setPassword("")
  }
  const handleRegister = async(username, password) => {
    const newUser = await registerUser(username, password)
    console.log("We are new user", newUser);
    setUser(newUser.username)
    setToken(newUser.token)
    setUsername("")
    setPassword("")
  }

  // console.log("this is token", token)
  // const buttonCheck = !token ? "register" : "login"
    return (
        <>
        <h1 className="centered ui header">Welcome To Account Form</h1>
        <form className="ui form"
        onSubmit={(event) => {event.preventDefault()}}
        >
           <h1 className="centered ui header">Login or Register</h1> 
           <div className="field">
          <label>Username</label>
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
        <button className="ui button" type="submit" onClick={()=>{

          handleRegister(username, password)
        }}>
        register
        </button>
        <button className="ui button" type="submit" onClick={() => {

          handleLogin(username, password)
        }}>
        login
        </button>
        </form>
    
        </>
    )
}



export default AccountForm;