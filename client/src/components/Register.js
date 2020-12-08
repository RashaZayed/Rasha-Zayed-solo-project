import React, { useState } from "react";
import axios from "axios";
import { Paper, FormControl, OutlinedInput, Button } from "@material-ui/core";
import { navigate, Link } from "@reach/router";
const styles = {
  paper: {
    width: "20rem",
    padding: "1rem",
    marginLeft: "450px",
  },
  input: {
    marginBottom: "1rem",
  },
  button: {
    margin: "10px",
  },
};
export default () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    pic: "",
  });
  const [picPreview, setPicPreview] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const onClickHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeHandler = (e) => {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function () {
        setUser({
          ...user,
          pic: btoa(reader.result),
        });
        setPicPreview("data:image/png;base64," + btoa(reader.result));
      };

      reader.readAsBinaryString(file);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, password2 } = user;
    axios
      .post("http://localhost:8000/api/register", user)
      .then((res) => {
        console.log(res);
        setUser({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          password2: "",
          pic: "",

        })
        setLoaded(true);

        // navigate("/")
      })
      .catch((err) => {
        console.log(err);
        const errArr = [err.response.data.message];
        setErrorMessage(errArr);
      });
  };
  const displayValidator = errorMessage.map((error, i) => {
    // return <p key={i}>{error}</p>
    return (
      <div key={i} class="alert alert-warning" role="alert">
        {error}
      </div>
    );
  });

  return (
    <Paper elevation={3} style={styles.paper}>
      {loaded && (
        <div class="alert alert-primary" role="alert">
          Thanks {user.firstname} for registering with us, please go ahead and sign in!
        </div>
      )}
      <h2>Registraion Form</h2>
      <form>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onClickHandler}
            name="firstname"
            type="text"
            value={user.firstname}
            placeholder="First Name"
          />
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onClickHandler}
            name="lastname"
            type="text"
            value={user.lastname}
            placeholder="Last Name"
          />
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onClickHandler}
            name="email"
            type="email"
            value={user.email}
            placeholder="Email"
          />
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onClickHandler}
            name="password"
            type="password"
            value={user.password}
            
            placeholder="Password"
          />
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onClickHandler}
            name="password2"
            type="password"
            value={user.password2}
            placeholder="Confirm Password"
          />
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          
          <OutlinedInput
            onChange={onChangeHandler}
            name="pic"
            type="file"
            // value={user.pic}
            accept="image/*"
            
          />
          <img className='imgPrev' src={picPreview}></img>
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          <div>
            <Button
              style={styles.button}
              type="submit"
              onClick={onSubmitHandler}
              variant="contained"
              color="primary"
            >
              Register
            </Button>

            <Button
              variant="contained"
              style={styles.button}
              color="primary"
              onClick={() => navigate("/")}
            >
              {" "}
              Sign in
            </Button>
          </div>
        </FormControl>

        <div>{displayValidator}</div>
      </form>
    </Paper>
  );
};
