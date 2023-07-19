import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import S from "./Home.module.scss";

function Home() {
  const { currentUser, dispatch } = useContext(AuthContext);
  console.log(currentUser);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className={S.container}>
      <button onClick={handleLogout}>Logout</button>;
    </div>
  );
}

export default Home;
