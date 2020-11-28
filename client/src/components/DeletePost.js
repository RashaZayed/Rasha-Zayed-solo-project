import React,{useState , useEffect} from 'react';
import axios from 'axios'
import { Paper, FormControl, OutlinedInput, Button } from "@material-ui/core";

export default(props)=>{
    const {id} = props;
    const styles = {
       
        
        button: {
          width: '5px',
          marginBottom: '10px',
          
          marginLeft: '150px' ,


        },
      };

      const onSubmitHandler = e =>{
          e.preventDefault();

          axios.delete('http://localhost:8000/api/post/:id' , id)
          .then(res=> console.log(res))
          .catch(err => console.log(err))
      }

    return(
        
            <Button
          type="submit"
          onClick={onSubmitHandler}
          variant="contained"
          style={styles.button}
        >
          X
        </Button> 
        
       
    )
}