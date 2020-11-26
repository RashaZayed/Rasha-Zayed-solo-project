import React from "react";
import { Link, navigate } from "@reach/router";

import Cookies from "universal-cookie";
export default () => {
  const cookies = new Cookies();
  const isAuthenticated = () => {
    if (cookies.get("auth") !== undefined) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      {isAuthenticated() ? (
        <h2>This is my profile Page</h2>
      ) : (
        <Link to="/">Please Sign In First</Link>
      )}
    </div>
  );
};
