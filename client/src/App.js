import Signin from "../src/components/Signin"
import './App.css';
import Register from '../src/components/Register'
import Profile from '../src/components/Profile'
import {Router} from "@reach/router"

function App() {
  
  
  

  return (
    <div className="App">
      <Router>
      <Signin path="/" />
      <Register path="/register" />
      <Profile  path='/profile'/>
      


      </Router>
      
    </div>
  );
}

export default App;
