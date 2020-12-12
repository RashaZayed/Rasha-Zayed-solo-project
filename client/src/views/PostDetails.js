import React,{useState} from "react";
import DisplayComments from "../components/DisplayComments";
import {Link} from '@reach/router'

export default (props) => {
  // const [comments , setComments] = useState('');
  return ( 
  <div>
      <p className='comment-link'>
      <Link to='/home'>Home  | </Link>
      <Link to='/profile'> Profile</Link>
      </p>
  <DisplayComments postId={props.id} />
  {/* //createCallBack={(comment)=> setComments(...comments, comment)} */}
  </div>
  );
};
