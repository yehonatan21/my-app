import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import axios from "axios";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { LoginContext } from "./Context/UserContext";

export interface CreatePostFormInputs {
  subject: string;
  recipients: string;
  body: string;
}

const Outbox: React.FC = () => {
  const [recipients, setRecipients] = useState<any[]>([]);
  const { loginUser } = useContext(LoginContext);
  const [isOpen, setOpen] = React.useState<boolean>(false);
  // const [value, setValue] = useState<null| string>("a@gmail.com");

  const { register, handleSubmit } = useForm<CreatePostFormInputs>();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: CreatePostFormInputs) => {
    const post = {
      sender: loginUser?.user.name,
      recipient: data.recipients,
      subject: data.subject,
      body: data.body,
    };
    axios
      .post("http://127.0.0.1:8000/mail/create", post, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${loginUser.token}`,
        },
      })
      .then((res: any) => {
        if (res.status === 200) {
          setOpen(true);
          // setValue(null)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRecipients = async () => {
    const response = await axios.get("http://127.0.0.1:8000/user/", {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${loginUser.token}`,
      },
    });
    const result = response.data.map((user: any) => user.email);
    setRecipients(result);
  };

  useEffect(() => {
    getRecipients();
  }, []);
  
  // useEffect(() => {
  // }, [setValue]);

  return (
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
        <h1>Create Post</h1>
        <TextField
          id="outlined-basic"
          label="Subject"
          variant="outlined"
          margin="normal"
          // value={value}
          required
          {...register("subject", { required: true })}
        />

        <Autocomplete
          disablePortal
          id="recipients"
          options={recipients}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Recipients"
              margin="normal"
              // value={value}
              required
              {...register("recipients", { required: true })}
            />
          )}
        />

        <TextField
          id="filled-multiline-static"
          margin="normal"
          label="Body"
          // value={value}
          multiline
          rows={4}
          {...register("body", { required: true })}
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"The mail sent Seccussfully"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </FormControl>
    </form>
  );
};

export default Outbox;
