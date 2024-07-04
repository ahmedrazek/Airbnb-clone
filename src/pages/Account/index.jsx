import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AccountNav from "../../components/AccountNav";
import { UserContext } from "../../userContext";
export default function Account() {
  const { user, ready } = useContext(UserContext);
  useEffect(() => {}, []);
  if (!ready) {
    return <div>Loading...</div>;
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <AccountNav />
      <Outlet />
    </div>
  );
}
