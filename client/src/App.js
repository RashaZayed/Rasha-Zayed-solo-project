import Signin from "../src/components/Signin";
import "./App.css";
import Register from "../src/components/Register";
import Profile from "../src/components/Profile";
import CreatePost from "../src/components/CreatePost";
import { Router } from "@reach/router";

function App() {
  return (
    <div className="App">
      <Router>
        <Signin path="/" />
        <Register path="/register" />
        <Profile path="/profile" />
        <CreatePost path="/post" />
      </Router>
    </div>
  );
}

export default App;
