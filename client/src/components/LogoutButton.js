import React, { useState } from "react";
import axios from "axios";
import {Button} from "react-bootstrap"
import Cookies from "universal-cookie" 
import { navigate } from "@reach/router";

export default(props) => {
    const {id} = props;
    const cookies = new Cookies();
    const token = cookies.get('auth')

    const onClickHandler = (e)=> {
        e.preventDefault();
        axios.get("http://localhost:8000/api/logout" , {
            headers: {
                auth: token,
              },
        })
        .then(res => {
            console.log(res)
            cookies.remove("auth")
            navigate("/")
        })
        .catch(err => console.log(err))
    }

    return(
        <Button className="logoutbtn" onClick={onClickHandler}>Logout</Button>
    )
}