import React, { useState } from "react";
import API from '../api';
import axios from "axios";


const APi = axios.create({
  baseURL: 'http://localhost:7000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const SignUpUser = async (userData) => {
  try {
    const response = await API.post('/user/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:7000/api/user/signup", {
        name,
        email,
        password,
      });
      console.log("SignUp Response:", response.data);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("SignUp Error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};


export default SignUp;
