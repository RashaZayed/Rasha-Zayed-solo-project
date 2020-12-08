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
  });
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
        setUser({ ...user, name: res.data.name, email: res.data.email });
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
        {user.name}
      </Card.Header>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.post}</Card.Text>
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

               
                <Button onClick={() => navigate("/home")}>Home</Button>
           
                <LogoutButton />
              </div>
            </div>
            <CreatePost createCallback={(post) => setPosts([post, ...posts])} />
            {loaded && displayPosts}
          </div>
        ) : (
          // <Link to="/">Please Sign In First</Link>
          redirectTo("http://localhost:3000/" , noThrow)
        )}
      </div>
    </Container>
  );
};
