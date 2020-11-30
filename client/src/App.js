import Signin from "../src/components/Signin";
import "./App.css";
import Register from "../src/components/Register";
import ProfilePage from "../src/views/ProfilePage";

import { Router } from "@reach/router";
import HomePage from "./views/HomePage";
import Like from './components/Like'


function App() {
  return (
    <div className="App">
      <Router>
        <Signin path="/" />
        <Register path="/register" />
        <ProfilePage path="/profile" />
        <Like path='/like' />
        <HomePage path="/home" />
        
      </Router>
    </div>
  );
}

export default App;
