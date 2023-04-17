import React from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

export interface RegisterFormInputs {
  name: string;
  email: string;
  verifyPassword: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = (data: RegisterFormInputs) => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    if (data.password === data.verifyPassword) {
      const users = localStorage.getItem("users");
      if (users) {
        const usersArray = JSON.parse(users);
        usersArray.push(user);
        localStorage.setItem("users", JSON.stringify(usersArray));
      } else {
        const usersArray = [];
        usersArray.push(user);
        localStorage.setItem("users", JSON.stringify(usersArray));
      }
      navigate("/login", { replace: true });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Name:
        </label>
        <input
          className="form-input"
          type="text"
          {...register("name", { required: true })}
        />
        {errors.email && (
          <span className="form-error">This field is required</span>
        )}
      </div>
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
      <div className="form-group">
        <label className="form-label" htmlFor="verifyPassword">
          Verify Password:
        </label>
        <input
          className="form-input"
          type="password"
          {...register("verifyPassword", { required: true })}
        />
        {errors.email && (
          <span className="form-error">This field is required</span>
        )}
      </div>
      <button className="form-button" type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
