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
  const [picPreview, setPicPreview] = useState(
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4xMCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOjQ5ZDRhN2FlLTI1NjYtNDY5Yi05NmI5LWUxYzAxM2JiNmEwYzwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjUxYWY0OTY0LWE4MjQtNDk1Yy04MzgzLTQ3OTYxMzNjMzY2YjwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/8AACwgBaAFoAQERAP/EABsAAQADAQEBAQAAAAAAAAAAAAAFBgcEAgMB/8QAPhABAAEDAgIECA0EAgMAAAAAAAECAwQFBhEhEjFBUQcTNmFzgbHRFSIkMkJSU2JxcpGhwRQjk+GC8RY0Vf/aAAgBAQAAPwDXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI59XN68XX9Sr9HmeXXyAAAAAAAAAAAAAfbCxMnMvRZxbFd6ueymOK16Xsa/ciK9RyYtR9nb51fr1LHhbX0TFiOGHF2qPpXZ6X+kpaxMWzHC1jWaI+7REPr0afqx+j5XcTFvRwu41muPvURKLzdr6JlRPHDi1VP0rU9H/Suapsa/bia9OyYux9nc5Vfr1Kpm4mTh3ps5ViuzXHZVHB8QAAAAAAAAAABZdsbVyNSinJy+lYxZ5x9av8O6PO0DT8HE0+xFnEsUWqI6+Ec5/Ge10gAObUMHE1CxNjLsU3aJ745x+E9jP9z7VyNNirJxOlfxY5z9aj8e+POrQAAAAAAAAAALjsrbMZEUalqFv+112rUx87zz5l9iIiOERwiAAACYiY4THGJULeu2Yx4r1LT7f9rru2oj5vnjzKcAAAAAAAAAAn9l6J8K5/jb9M/wBLYmJr+9PZS06mIppimmIiIjhER2P0AAAflURVTNNURMTHCYntZjvTRPgrP8bYpn+lvzM0fdntpQAAAAAAAAAA9Wrdd27Rat0zVXXMU0xHbMtd0DTqNL0uziURHSpjjXP1qp65d4AAADg1/TqNU0u9iV8OlVHGifq1R1SyK7brtXa7Vymaa6JmmqJ7Jh5AAAAAAAAAWPwe4MZWuxfrjjRjU9P/AJdUe/1NLAAAABmnhCwYxddm/RHCjJp6f/Lqn3+tXAAAAAAAAAGh+DPGi3pF7JmOd67w9VMf9rWAAAACqeEvGi5pFnJiPjWbvD1VR/0zwAAAAAAAABquybcW9sYfD6VM1T66pTIAAAAIbe1uLm2Mzj9GmKo9VUMqAAAAAAAAAaxtCYnbWDw+z/mUsAAAACJ3fPDbWdx+z/mGTgAAAAAAAANP2Bei7tmxTx526qqJ/Xj/ACnwAAAAQG/73its36ePO5VTRH68f4ZgAAAAAAAAAvHgwy46OXg1TziYu0x+0/wuwAAAAKT4T8uOjiYNM85mbtUftH8qOAAAAAAAAAk9sah8G61j5Mzwt8ehc/LPKfe1uJiYiYnjE9UgAAABMxETMzwiOuWSbn1D4S1rIyYnjb49C3+WOUe9GAAAAAAAAADSdhavGdpsYd6r5Rjxw59dVHZP8LKAAAArW/dXjB02cOzXwyMiOHLrpo7Z/hmwAAAAAAAAAOnS86/p2dby8erhXRPV2VR2xLWNG1LH1TBoyserlPKqmeume6XaAAAOLWdSx9Lwa8rIq5Ryppjrqnuhk+qZ1/Uc65l5FXGuuerspjsiHMAAAAAAAAAAkNB1fK0jMi/YnpUTyuW5nlXHv87T9F1bD1bFi9i184+fRPzqJ87vAABwa1q2HpOLN7Kr5z8yiPnVz5mYa9q+Vq+ZN+/PRojlbtxPKiPf50eAAAAAAAAAAD74OXk4WRTkYt6q1cp7Yn29686FvTHvRTZ1OnxFzq8bTHxJ/HuWuxetX7cXLNyi5RPVVTPGJewB4v3rVi3Ny9cot0R11VTwiFU13emPZiqzplPj7nV42qPiR+Heo2dl5ObkVZGVequ3Ku2Z9nc+AAAAAAAAAAAAOjCzszCr6eJk3bM/dq5T6lgwt7apZiKci3ZyI75joz+3uSlnfmPMf3tPu0z9yuJ9z7/+dabw/wDVyv0p974Xt+Y8R/Z0+7VP364j3ovN3tql6Jpx7dnHjviOlP7+5X83OzM2vp5eTdvT96rlHqc4AAAAAAAAAAAAAAAAAAAAAAAAAA7MHS9QzZ+S4d67HfFPL9epN4eydVu8Jv3LGPHdNXSn9ktjbDxaeE5Gddr81FMU+9IWdnaHb+dZu3PzXJ/h129t6HR1adZn83Gfa+1OiaRT1abi/wCOHv4I0r/52L/ih4q0TSKuvTcX/HD43Nt6HX16dZj8vGPY5L2ztDufNs3bf5bk/wAo/J2HjVcZx867RPdXTFXs4InM2TqtrjNi5YyI7oq6M/uhM7S9Qwp+VYd61HfNPL9epxgAAAAAAAAD1at13bkW7dFVddU8IppjjMrPo+y8/KiLmbXGJbn6PXXPq7Ft0zbWkYHCqjGi9cj6d340+5MRERHCIiIjsgAAACYiY4TETE9kofU9taRn8aq8aLNyfp2viz7lS1jZefixNzCrjLtx9Hqrj1dqsXbddq5Nu5RVRXTPCaao4TDyAAAAAAAAmtu7dzdXqi5EeJxonndqjr/CO1oejaLgaVb6OLZjxnD41yrnVPrSIAAAAAjtZ0XA1W30cqzHjOHxblPKqPWzzcW3c3SKpuTHjsaZ5XaY6vxjsQoAAAAAAAteztrzndHO1Cmacbrot9U3PPPm9rQbdFFuimi3TFNNMcIiI4REPQAAAAADzcoouUVUXKYqpqjhMTHGJhn28drzg9LO0+masbrrt9c2/PHmVQAAAAAAFi2VoXwpl/1ORT8kszzj69Xd72l0xFNMU0xEREcIiOx+gAAAAAA/KoiqmaaoiYmOExPazTe2hfBeX/U49PyS9PKPqVd3uV0AAAAAB9cLHuZeXaxrMcbl2qKaWv6VhWtOwLWJZj4tunhx757ZdQAAAAAAA5dVwrWo4F3EvR8W5Tw4909ksgzce5iZd3GvRwuWqppqfIAAAAAFt8GmDF3UL2dXHGLFPRo/NP8Ar2tBAAAAAAAAZ94S8GLWoWc6iOEX6ejX+aP9exUgAAAAAaX4PMeLO3abnDneuVVz7I9ixgAAAAAAAK54Q8eL23a7nDnZuU1x7J9rNAAAAAAaztCmKdtYMR9lx/eUqAAAAAAAAit30xVtrOifsuP7wyYAAAAAGtbS8m8D0UJQAAAAAAABF7t8m8/0UslAAAAABrW0vJvA9FCUAAAAAAAARe7fJvP9FLJQAAAAAa1tLybwPRQlAAAAAAAAEXu3ybz/AEUslAAAAABrW0vJvA9FCUAAAAAAAARe7fJvP9FLJQAAAAAa1tLybwPRQlAAAAAAAAEXu3ybz/RSyUAAAAAGtbS8m8D0UJQAAAAAAABF7t8m8/0UslAAAAABrW0vJvA9FCUAAAAAAAARe7fJvP8ARSyUAAAAAGtbS8m8D0UJQAAAAAAABF7t8m8/0UslAAAAABrW0vJvA9FCUAAAAAAAARe7fJvP9FLJQAAf/9k="
  );
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
        });
        setLoaded(true);
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
          Thanks {user.firstname} for registering with us, please go ahead and
          sign in!
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
          <img className="imgPrev" src={picPreview}></img>
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
