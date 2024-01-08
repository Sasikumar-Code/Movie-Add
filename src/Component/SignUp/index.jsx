import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../gobalAPI/API";
import "./index.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Conpassword, setConPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: email,
      pass: password,
    };
    const users = await axios.post(`${API}/user/singUp`, data);

    // Send email and password to server useEffect(() => {
    navigate("/");
  };
  function BackTo() {
    navigate("/");
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="underline"></div>
      <label>
        Email:
        <input
          className="form-input"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          className="form-input"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        Conform Password:
        <input
          className="form-input"
          name="password"
          type="password"
          value={Conpassword}
          onChange={(e) => setConPassword(e.target.value)}
        />
      </label>
      <br />
      <button className="submit-button" type="submit">
        Sign Up
      </button>
      <button className="submit-button" onClick={BackTo}>
        Back To
      </button>
    </form>
  );
}

export default SignUp;
