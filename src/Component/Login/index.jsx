import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../gobalAPI/API";

import { useState } from "react";
import { UserContext } from "../../UseContext";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const onSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: userName,
      pass: password,
    };
    const users = await fetch(`${API}/user/login`, {
      method: "POST",

      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (users.ok) {
      users.json().then((userInfo) => {
        setUserInfo(userInfo);
        navigate("/Portal");
      });
    } else {
      alert("Wrong Credentials");
      navigate("/signUp");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="container">
          <div className="img">
            <img
              src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
              alt="avatar"
            />
          </div>
          <div className="body">
            <div className="username ">
              <PersonIcon className="svg" />
              <TextField
                label="email"
                name="email"
                type="email"
                value={userName}
                variant="outlined"
                onChange={(e) => setUserName(e.target.value)}
                className="input"
              />
            </div>
            <div className="password">
              <LockIcon className="svg" />
              <TextField
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
                className="input"
              />
            </div>
            <Button className="button" type="submit" variant="contained">
              Login
            </Button>
            <p>
              If U Don't Have An Account? <Link to={"/signUp"}>Sing Up</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
