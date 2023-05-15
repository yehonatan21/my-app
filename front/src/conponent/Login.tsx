import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import "../styles/login.css";
import { LoginContext } from "./Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, TextField } from "@mui/material";
import { backAPI } from "../api/back_api";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { setLoginUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isOpen, setOpen] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    const res = await backAPI.login(data);
    if (res.status === 200) {
      const auth = await backAPI.auth(res);
      setLoginUser(auth.data);
      navigate("/inbox", { replace: true });
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <form
        className="login-form"
        style={{ display: "flex" }}
        onSubmit={handleSubmit(onSubmit)}
      >
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
            defaultValue={"a@gmail.com"}
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
            defaultValue={"111111"}
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
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User Not Found"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
