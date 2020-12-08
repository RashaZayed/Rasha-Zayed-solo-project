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
  });
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const onClickHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, password2 } = user;
    axios
      .post("http://localhost:8000/api/register", {
        firstname,
        lastname,
        email,
        password,
        password2,
      })
      .then((res) => {
        console.log(res);
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
    return <div key={i} class="alert alert-warning" role="alert">{error}
  
</div>
  });

  return (
    <Paper elevation={3} style={styles.paper}>
      {loaded && (
        <div class="alert alert-primary" role="alert">
          Thanks for registering with us, please go ahead and sign in!
        </div>
      )}
      <h2>Registraion Form</h2>
      <form>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onClickHandler}
            name="firstname"
            type="text"
            placeholder="First Name"
          />
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onClickHandler}
            name="lastname"
            type="text"
            placeholder="Last Name"
          />
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onClickHandler}
            name="email"
            type="email"
            placeholder="Email"
          />
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onClickHandler}
            name="password"
            type="password"
            placeholder="Password"
          />
        </FormControl>
        <FormControl variant="outlined" style={styles.input}>
          <OutlinedInput
            onChange={onClickHandler}
            name="password2"
            type="password"
            placeholder="Confirm Password"
          />
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
