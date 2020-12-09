import React, { useState, useEffect } from "react";
import { Link, navigate, redirectTo } from "@reach/router";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, Card, Container } from "react-bootstrap";
import CreatePost from "../components/CreatePost";
import LogoutButton from "../components/LogoutButton";
import Like from "../components/Like";
import Dislike from "../components/Dislike";

export default () => {
  const cookies = new Cookies();
  const token = cookies.get("auth");
  const [user, setUser] = useState({
    name: "",
    email: "",
    pic: "",
  });
  const [pic, setPic] = useState("");
  const isAuthenticated = () => {
    if (token !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  if (!isAuthenticated()) navigate("/");

  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/profile", {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        setUser({
          ...user,
          name: res.data.name,
          email: res.data.email,
          pic: res.data.pic,
        });
        setPic("data:image/png;base64," + res.data.pic);
        console.log(res);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8000/api/myposts", {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        setPosts(...posts, res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const displayPosts = posts.map((post, i) => (
    <Card className="post">
      <Card.Header as="h5" key={i}>
        {" "}
        <img src={pic} className="userspp" />
        {user.name}
      </Card.Header>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.post}</Card.Text>
        <Link to={"/PostDetails/" + post._id}> Comments |</Link>
        <Like id={post._id} like={post.like} />
        <Dislike id={post._id} dislike={post.disLike} />
      </Card.Body>
    </Card>
  ));

  return (
    <Container>
      <div>
        {isAuthenticated() ? (
          <div>
            <div className="card profile">
              <div className="card-body">
                <h5 className="card-title">Welcome to your profile!</h5>

                <p className="card-text">{user.name}</p>
                <p className="card-text">{user.email}</p>
                <img className="ppic" src={pic}></img>

                <Button onClick={() => navigate("/home")}>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-house"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                  </svg>
                  <span>Home</span>
                </Button>

                <LogoutButton />
              </div>
            </div>
            <CreatePost createCallback={(post) => setPosts([post, ...posts])} />
            {loaded && displayPosts}
          </div>
        ) : (
          <Link to="/">Please Sign In First</Link>
        )}
      </div>
    </Container>
  );
};
