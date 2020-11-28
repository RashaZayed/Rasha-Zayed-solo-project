import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, FormControl, OutlinedInput, Button } from "@material-ui/core";
import { navigate, Link } from "@reach/router";
import DeletePost from "./DeletePost";
import Cookies from "universal-cookie";

const styles = {
  paper: {
    width: "20rem",
    padding: "1rem",
    margin: "50px",
  },
  input: {
    marginBottom: "1rem",
  },
  button: {
    
    margin: '20px'
  },
};
const cookies = new Cookies();
const token = cookies.get('auth');

export default () => {
  const [postContent, setPostContent] = useState({
    title: "",
    post: "",
  });
  const [postId , setPostId] = useState('');
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
      .post("http://localhost:8000/api/post", { title, post }, {
        headers: {
            auth : token
          }
      })
      .then((res) => {
          setPostId([...postId, res.data._id]);
          console.log(res)
        })
      .catch((err) => console.log(err));
  };
  console.log("id is" , postId)

  return (
    <Paper elevation={3} style={styles.paper}>
      <form>
        <FormControl variant="outlined" style={styles.input}>
        <DeletePost  id={postId} /> 
             
          <OutlinedInput
            onChange={onChangeHandler}
            name="title"
            type="text"
            placeholder="Title.."
          />
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onChangeHandler}
            name="post"
            type="text"
            placeholder="What is in your mind?"
          />
        </FormControl>
        <br />

        <Button
          type="submit"
          onClick={onSubmitHandler}
          variant="contained"
          color="primary"
          style={styles.button}
        >
          Post
        </Button>
       
      </form>
    </Paper>
  );
};
