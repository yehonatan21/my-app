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
import axios from "axios";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { setLoginUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: LoginFormInputs) => {
    axios
      .post("http://127.0.0.1:8000/user/login", {
        email: data.email,
        password: data.password,
      })
      .then(async (res) => {
        if (res.data.token) {
          //FIXME: any
          const user: any = await axios.get(
            "http://127.0.0.1:8000/auth/get_token",
            {
              withCredentials: true,
              headers: {
                Authorization: res.data.token,
              },
            }
          );
          setLoginUser(user.data);
          navigate("/inbox", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setOpen(true);
      });
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
        open={open}
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
