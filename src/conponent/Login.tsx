import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import "../styles/login.css";
import { LoginContext } from "./Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { RegisterFormInputs } from "./Register"; //BUG interface folder?
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, TextField } from "@mui/material";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { setLoginUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: LoginFormInputs) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: RegisterFormInputs) =>
        user.email === data.email && user.password === data.password
    );
    if (user) {
      setLoginUser(user); // TODO: create lable to show user name
      navigate("/inbox", { replace: true });
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          id="form"
          sx={{
            display: "flex",
            flexGrow: 1,
            padding: "5%",
            borderRadius: "3%",
            border: 1,
            backgroundColor: "white",
          }}
        >
          <h1>Login</h1>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="normal"
            required
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="form-error">This field is required</span>
          )}
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            required
            {...register("password", { required: true })}
          />

          {errors.password && (
            <span className="form-error">This field is required</span>
          )}
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button variant="text" component={Link} to={"/register"}>
            Register
          </Button>
        </FormControl>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User Not Found"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
