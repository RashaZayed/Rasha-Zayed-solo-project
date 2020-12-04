import Signin from "../src/components/Signin";
import "./App.css";
import Register from "../src/components/Register";
import ProfilePage from "../src/views/ProfilePage";

import { Redirect, Router } from "@reach/router";
import HomePage from "./views/HomePage";
import Like from "./components/Like";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div className="App">
      <Router>
        <Signin path="/" />
        <Register path="/register" />

        <ProfilePage path="/profile" />
        <FileUpload path='/upload' />

        <HomePage path="/home" />
      </Router>
    </div>
  );
}

export default App;
