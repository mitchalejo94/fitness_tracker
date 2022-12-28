import react from "react";


const AccountForm = () => {
    return (
        <>
        <h1 className="centered ui header">Welcome To Account Form</h1>
        <form className="ui form">
           <h1 className="centered ui header">Login or Register</h1> 
           <div className="field">
          <label>Username</label>
          <input
            type="text"
            //value={username}
            placeholder="username"
            required
            //onChange={(event) => setUsername(event.target.value)}
          />
          </div>
          <div className="field">
          <label>Password</label>
          <input
            type="password"
            //value={password}
            placeholder="password"
            minLength="8"
            required
            //onChange={(event) => setPassword(event.target.value)}
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