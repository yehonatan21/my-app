import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import "../styles/login.css";
import { LoginContext } from "./Context/UserContext";
import { Link } from "react-router-dom";
import { RegisterFormInputs } from "./Register"; //BUG

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { setLoginUser } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: RegisterFormInputs) =>
        user.email === data.email && user.password === data.password
    );

    setLoginUser(user); // TODO: create lable to show user name
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="form-input"
            type="text"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="form-error">This field is required</span>
          )}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-input"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="form-error">This field is required</span>
          )}
        </div>
        <button className="form-button" type="submit">
          Login
        </button>
      </form>
      <Button variant="text" component={Link} to={"/register"}>
        Register
      </Button>
    </>
  );
};

export default Login;
