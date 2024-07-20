import React from "react";
import { useLogout } from "../api/MyUserApi";

const Home = () => {
  const { logout } = useLogout();
  const LogoutHandler = async () => {
    logout();
  };
  return (
    <div>
      <button onClick={LogoutHandler}>Logout</button>
    </div>
  );
};

export default Home;
