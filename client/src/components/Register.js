import React,{useState} from 'react';
import axios from 'axios';
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button
} from '@material-ui/core';
const styles = {
    paper: {
        width: "20rem", padding: "1rem" , marginLeft: "450px",
    },
    input: {
        marginBottom: "1rem"
    },
    button: {
        width: "100%"
    }
}
export default () => {
    const [user, setUser] = useState ({
        firstname: "",
        lastname: "",
        email:"",
        password:"",
        password2:"",
    })
    const onClickHandler = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
    const onSubmitHandler = (e)=> {
        e.preventDefault();
        const {firstname , lastname , email,password, password2}= user;
        axios.post("http://localhost:8000/api/register" , {firstname , lastname , email,password, password2})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    console.log(user);
    return (
        <Paper elevation={3} style={styles.paper}>
            <h2>Registraion Form</h2>
            <form>
                <FormControl  variant="outlined" style={styles.input}>
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput onChange={onClickHandler} name="firstname" type="text"/>
                </FormControl>
                <FormControl variant="outlined"  style={styles.input}>
                    <InputLabel>Last Name</InputLabel>
                    <OutlinedInput onChange={onClickHandler} name="lastname"  type="text"/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>E-mail</InputLabel>
                    <OutlinedInput onChange={onClickHandler} name="email" type="email"/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput onChange={onClickHandler} name="password" type="password"/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel> Confirm Password</InputLabel>
                    <OutlinedInput  onChange={onClickHandler}  name="password2" type="password"/>
                </FormControl>
                <Button type="submit" onClick={onSubmitHandler}variant="contained" color="primary">
                    Register
                </Button>
            </form>
        </Paper>
    )
}