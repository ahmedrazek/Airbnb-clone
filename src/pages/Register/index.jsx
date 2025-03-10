import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            name=""
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name=""
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name=""
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Sign up</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <NavLink className="underline text-black" to={"/login"}>
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
