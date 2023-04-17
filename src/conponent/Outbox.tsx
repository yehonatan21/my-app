import React from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import { Autocomplete, Button, FormControl, TextField } from "@mui/material";

export interface CreatePostFormInputs {
  subject: string;
  recipients: string;
  body: string;
}

const Outbox: React.FC = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const { handleSubmit } = useForm<CreatePostFormInputs>();

  const onSubmit = (data: CreatePostFormInputs) => {
    const post = {
      subject: data.subject,
      recipients: data.recipients,
      body: data.body,
    };
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
            />
          )}
        />

        <TextField
          id="filled-multiline-static"
          margin="normal"
          label="Body"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained">Send</Button>
      </FormControl>
    </form>
  );
};

export default Outbox;
