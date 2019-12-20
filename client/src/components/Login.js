import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState(
    {
     username: "",
     password: ""
   }
 );

 const handleChange = e => {
  setLogin({
      ...login,
      [e.target.name]: e.target.value
  });
  console.log(login)
};

// (username === "Lambda School" && password === "i<3Lambd4")
const handleSubmit = e => {
  e.preventDefault();
  axiosWithAuth()
    .post("/login", login)
    .then(res => {
      console.log(res);
      window.localStorage.setItem("token", res.data.payload);
      props.history.push("/bubbles");
    })
    .catch(err =>console.log("LOGIN ERROR",err));
};
  return (
    <div className="mainCont">
      <h1 className="welcomeText">Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={login.username}
              onChange={handleChange}
            />
          <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={login.password}
              onChange={handleChange}
            />
          <button>Log in</button>
        </form>
    </div>
  );
};

export default Login;
