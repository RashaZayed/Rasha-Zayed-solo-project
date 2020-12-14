import React, { useState, useEffect } from "react";
import axios from "axios";
import Like from "../components/Like";
import Dislike from "../components/Dislike";
import { Card, Button, Container } from "react-bootstrap";
import Cookies from "universal-cookie";
import { TextField } from "@material-ui/core";

const DisplayComments = (props) => {
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
            setComments(...comments, res.data);

            setLoaded(true);
          });
      })
      .catch((err) => console.log(err));
  }, []);
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
        setComments([...comments , res.data])
        
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  console.log("comment" + comments);
  

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
            
            { comments.length > 0 &&
                comments.map((comment, i) => (
                    <div key={i} className="alert alert-primary" role="alert">
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
                ))
            }
            </Card.Body>
          <Card.Body>
            <TextField
              onChange={onChangeHandler}
              placeholder="Add a comment"
              value={body}
            ></TextField>
            <Button onClick={onClickHandler}>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-caret-right-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
export default DisplayComments;

