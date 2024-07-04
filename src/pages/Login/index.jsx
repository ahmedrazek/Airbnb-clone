import axios from "axios";
import { useContext, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { UserContext } from "../../userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser, setReady } = useContext(UserContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("hello");
      const res = await axios.post("/login", { email, password });
      setUser(res.data);
      setReady(true);
      alert("login successfully");
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };
  if (redirect) return <Navigate to={"/"} />;
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
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
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don&apos;t have an account yet?{" "}
            <NavLink className="underline text-black" to={"/register"}>
              Register now
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
