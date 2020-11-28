import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";

import Cookies from "universal-cookie";
export default () => {
  const cookies = new Cookies();
  const [user , setUser] = useState({
    name: '',
    email: '',
  })
  const isAuthenticated = () => {
    if (cookies.get("auth") !== undefined) {
      return true;
    } else {
      return false;
    }
  };
  const token = cookies.get("auth");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/profile", {
      headers: {
        auth: token,
      },
    })
    .then(res => {
      setUser({...user , 
        name: res.data.name,
        email: res.data.email,
      })
      console.log(res)
    })
    .catch(err => console.log(err))

    // axios.get('http://localhost:8000/api/posts' )
    // .then(res => {
    //   setPosts(res.data)
    // })
    // .catch(err=> console.log(err))
  }, []);
  const displayPosts = () =>
    posts.map((post, i) => {
      return (
        <div key={i}>
          <h2>{post.title}</h2>
          <p>{post.post}</p>
          {/* <div className="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{post.title}</h5>
    <p class="card-text">{post.post}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}
        </div>
      );
    });
  return (
    <div>
      {isAuthenticated() ? (
        <div>
          <h2>This is my profile Page</h2>
          <div >
           <p> {user.name}</p>
           <p>{user.email}</p> 
            </div>
          {displayPosts()}
        </div>
      ) : (
        <Link to="/">Please Sign In First</Link>
      )}
    </div>
  );
};
