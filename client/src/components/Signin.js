import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from "universal-cookie";
import axios from "axios";

import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState([]);
  const classes = useStyles();
  const cookies = new Cookies();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { email, password } = user;
    axios
      .post("http://localhost:8000/api/login", { email, password })
      .then((res) => {
        if (res.data.auth !== undefined) {
          cookies.set("auth", res.data.auth); //take the token from response and set in cookies
         
          navigate("/profile");
        }
        console.log(res);
      })
      .catch((err) => {                   //for backend validations
        console.log(err);
        const errArr = [err.response.data.message];
        setErrorMessage(errArr);
      });
  };
  const displayValidator = errorMessage.map((error, i) => {
    return (
      <p className="alert alert-warning alert-dismissible fade show" key={i}>
        {error}
      </p>
    );
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={onChangeHandler}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={onChangeHandler}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            onClick={onSubmitHandler}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {displayValidator}
    </Container>
  );
}
