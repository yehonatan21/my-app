import React from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { backAPI } from "../api/back_api";

export interface RegisterFormInputs {
  name: string;
  email: string;
  verifyPassword: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    if (data.password === data.verifyPassword) {
      const res = await backAPI.singup(user);
      if (res.status === 200) {
        setDialogContent("User created successfully");
        navigate("/login", { replace: true });
      }
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
          <h1>Register</h1>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            margin="normal"
            required
            {...register("name", { required: true })}
          />
          {errors.email && (
            <span className="form-error">This field is required</span>
          )}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
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
            inputProps={{ minLength: 6 }}
            required
            {...register("password", { required: true })}
          />

          {errors.password && (
            <span className="form-error">This field is required</span>
          )}
          <TextField
            id="outlined-basic"
            label="Verify Password"
            variant="outlined"
            margin="normal"
            type="password"
            required
            {...register("verifyPassword", { required: true })}
          />

          {errors.password && (
            <span className="form-error">This field is required</span>
          )}
          <Button type="submit" variant="contained">
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
        <DialogTitle id="alert-dialog-title">{dialogContent}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Register;
