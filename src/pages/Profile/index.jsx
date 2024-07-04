import axios from "axios";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../userContext";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="text-center max-w-lg mx-auto">
      Logged in as {user.name} ({user.email})
      <button onClick={logout} className="primary max-w-sm mt-2">
        Logout
      </button>
    </div>
  );
}
