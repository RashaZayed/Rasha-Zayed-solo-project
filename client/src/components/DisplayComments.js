import React, { useState, useEffect } from "react";
import axios from "axios";
import Like from "../components/Like";
import Dislike from "../components/Dislike";
import { Card, Button, Container } from "react-bootstrap";
import Cookies from "universal-cookie";
import { TextField } from "@material-ui/core";

export default (props) => {
  const cookies = new Cookies();
  const token = cookies.get("auth");
  const { postId } = props;
  const [post, setPost] = useState("");
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { createCallBack } = props;
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/post/" + postId, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        console.log(res);
        setPost(res.data);

        axios
          .get("http://localhost:8000/api/comments/" + postId, {
            headers: {
              auth: token,
            },
          })
          .then((res) => {
            setComments(...comments, res.data);

            setLoaded(true);
          });
      })
      .catch((err) => console.log(err));
  }, [setComments]);
  const onChangeHandler = (e) => {
    setBody(e.target.value);
  };

  const onClickHandler = (e) => {
    axios
      .post(
        "http://localhost:8000/api/comments",
        { body, postId },
        {
          headers: {
            auth: token,
          },
        }
      )
      .then((res) => {
        setBody("");
        createCallBack(res.data.body);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  console.log("comment" + comments);
  const displayComments = comments.map((comment, i) => {
    return (
      <div key={i} class="alert alert-primary" role="alert">
        <img
          className="comment-pic"
          src={"data:image/png;base64," + comment.userId.pic}
        />{" "}
        <span>
          {" "}
          {comment.userId.firstname} {comment.userId.lastname}{" "}
        </span>
        <p> {comment.body}</p>
      </div>
    );
  });

  return (
    <div>
      {loaded && (
        <Card className="post">
          <Card.Header as="h5" key="1">
            <img
              src={"data:image/png;base64," + post.userId.pic}
              className="userspp"
            />
            <span className="disname"> {loaded && post.userId.firstname}</span>
            <span className="disname">{loaded && post.userId.lastname}</span>
          </Card.Header>
          <Card.Body>
            <Card.Title>{loaded && post.title}</Card.Title>
            <Card.Text>{loaded && post.post}</Card.Text>
            <Like id={post._id} like={post.like} />
            <Dislike id={post._id} dislike={post.disLike} />
          </Card.Body>
          <Card.Body>{displayComments}</Card.Body>
          <Card.Body>
            <TextField
              onChange={onChangeHandler}
              placeholder="Add a comment"
              value={body}
            ></TextField>
            <Button onClick={onClickHandler}> Comment </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
