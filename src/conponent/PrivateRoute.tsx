import React, { useContext } from "react";
import { LoginContext } from "./Context/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  //FIXME type any
  const { loginUser } = useContext(LoginContext);

  return loginUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;