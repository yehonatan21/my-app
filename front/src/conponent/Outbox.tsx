import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import axios from "axios"
import { Autocomplete, Button, FormControl, TextField } from "@mui/material";
import { LoginContext } from "./Context/UserContext";

export interface CreatePostFormInputs {
  subject: string;
  recipients: string;
  body: string;
}

const Outbox: React.FC = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const { loginUser } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
  } = useForm<CreatePostFormInputs>();

  const onSubmit = (data: CreatePostFormInputs) => {
    const post = {
      sender: loginUser?.name,
      subject: data.subject,
      recipients: data.recipients,
      body: data.body,
    };
    axios.post("http://127.0.0.1:8000/post/create", post).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
    const posts = localStorage.getItem("posts");
    if (posts) {
      const postsArray = JSON.parse(posts);
      postsArray.push(post);
      localStorage.setItem("posts", JSON.stringify(postsArray));
    } else {
      const postsArray = [];
      postsArray.push(post);
      localStorage.setItem("posts", JSON.stringify(postsArray));
    }
  };

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
          required
          {...register("subject", { required: true })}
        />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={users.map((user: any) => {
            //FIXME: any
            return user.email;
          })}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Recipients"
              margin="normal"
              required
              {...register("recipients", { required: true })}
            />
          )}
        />

        <TextField
          id="filled-multiline-static"
          margin="normal"
          label="Body"
          multiline
          rows={4}
          {...register("body", { required: true })}

        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </FormControl>
    </form>
  );
};

export default Outbox;
