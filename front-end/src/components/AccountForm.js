import React, {useState} from "react";
import {registerUser} from "../api/api";


const AccountForm = ({setToken}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async(username, password) => {
  
    console.log(username, "here is username")
    console.log(password, "here is password")
    const {user, message, token} = await registerUser(username, password)
    setToken(token)

    alert(message)
    //'user' is an object with id and username
    return user
  }
    return (
        <>
        <h1 className="centered ui header">Welcome To Account Form</h1>
        <form className="ui form"
        onSubmit={(event)=>{
          event.preventDefault();
          handleSubmit(username, password)
        }}>
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
        <button className="ui button" type="submit">
          Login or Register
        </button>
        </form>
    
        </>
    )
}



export default AccountForm;