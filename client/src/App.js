import Signin from "../src/components/Signin";
import "./App.css";
import Register from "../src/components/Register";
import ProfilePage from "../src/views/ProfilePage";

import { Redirect, Router } from "@reach/router";
import HomePage from "./views/HomePage";
import PostDetails from "./views/PostDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Signin path="/" />
        <Register path="/register" />

        <ProfilePage path="/profile" />
        <PostDetails path="/PostDetails/:id" />
        <HomePage path="/home" />
      </Router>
    </div>
  );
}

export default App;
