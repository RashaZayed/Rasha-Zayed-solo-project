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
            setComments(...comments, res.data.body);
            setLoaded(true);
          });
      })
      .catch((err) => console.log(err));
  }, []);
  const onChangeHandler = (e) => {
    setBody(e.target.value);
  };

  const onClickHandler = (e) => {
    //send userId
    axios
      .post("http://localhost:8000/api/comments", body, {
        headers: {
          auth: token,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
          <Card.Body>
            <TextField
              onChange={onChangeHandler}
              placeholder="Add a comment"
            ></TextField>
            <Button onClick={onClickHandler}> Comment </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
