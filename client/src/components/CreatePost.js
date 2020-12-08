import React, { useState } from "react";
import axios from "axios";
import { Paper, FormControl, OutlinedInput, Button } from "@material-ui/core";
import { navigate, Link } from "@reach/router";
import DeletePost from "./DeletePost";
import Cookies from "universal-cookie";

const styles = {
  paper: {
    width: "800px",
    padding: "1rem",
    margin: "25px",
  },
  input: {
    marginBottom: "1rem",
    marginLeft: "4rem",
  },
  button: {
    float: "right",
    marginTop: "8px",
    backgroundColor: "#007bff",
    color: "white",
  },
};
const cookies = new Cookies();
const token = cookies.get("auth");

export default (props) => {
  const [postContent, setPostContent] = useState({
    title: "",
    post: "",
  });
  const { createCallback } = props;

  const onChangeHandler = (e) => {
    setPostContent({
      ...postContent,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { title, post } = postContent;
    axios
      .post(
        "http://localhost:8000/api/post",
        { title, post },
        {
          headers: {
            auth: token,
          },
        }
      )
      .then((res) => {
        createCallback(res.data);
        setPostContent({
          title: "",
          post: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="createPost">
      <Paper elevation={3} style={styles.paper}>
        <form>
          <Button
            type="submit"
            onClick={onSubmitHandler}
            variant="contained"
            style={styles.button}
          >
            Post
          </Button>
          <FormControl variant="outlined" style={styles.input}>
            <OutlinedInput
              onChange={onChangeHandler}
              name="title"
              value={postContent.title}
              type="text"
              placeholder="Title.."
            />
          </FormControl>
          <FormControl variant="outlined" style={styles.input}>
            <OutlinedInput
              onChange={onChangeHandler}
              name="post"
              value={postContent.post}
              type="text"
              placeholder="What is in your mind?"
            />
          </FormControl>
          <br />
        </form>
      </Paper>
    </div>
  );
};
