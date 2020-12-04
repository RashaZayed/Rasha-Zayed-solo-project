import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "@reach/router";
import { Card, Button, Container } from "react-bootstrap";
import CreatePost from "../components/CreatePost";

import LogoutButton from "../components/LogoutButton";
import Dislike from "../components/Dislike";
import Like from "../components/Like";

export default () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("auth");

  const isAuth = () => {
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts", {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        setPosts(...posts, res.data);
        setLoaded(true)
        

        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  

  const displayPosts = posts.map((post, i) => {
      
    
    return (
      <Card className="post">
        <Card.Header as="h5" key={i}>
         
       <span className='disname'> {post.userId.firstname}</span><span className='disname'>{post.userId.lastname}</span>
          
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.post}</Card.Text>
          <Like id={post._id} like={post.like} />
          <Dislike id={post._id} dislike={post.disLike} />
        </Card.Body>
      </Card>
    );
  });

  return (
    <Container>
      <div>
        {isAuth() ? (
          <div>
            <div>
              <h1>News Feed </h1>

              <CreatePost />
              {loaded &&displayPosts}
            </div>
            <LogoutButton />
          </div>
        ) : (
          <Link to="/">Sign In first</Link>
        )}
      </div>
    </Container>
  );
};
