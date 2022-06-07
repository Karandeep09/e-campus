import { useEffect, useState } from "react";
import authHeader from "../sevices/authHeader.service";
import moment from "moment";
const axios = require("axios");
const Comments = ( {post_id} ) => {
    const  [comments, setComments] = useState([]);
    function handleComment(){
        const comment = document.querySelector(`#comment-input-${post_id}`);
      if(comment && comment.value){  
        console.log(comment.value);
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({content : comment.value, post_id : post_id})
        };

        fetch(`${process.env.REACT_APP_API_URL}/auth/comment`, requestOptions)
            .then(response => {
                document.querySelector(`#comment-input-${post_id}`).value = ''; 
                fetchComments(post_id);
            })
        }   
    }
    
        const fetchComments = async function(post_id){
            console.log("Pid", post_id);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/comments/${post_id}`);
            setComments(res.data);
        }

    useEffect( ()=>{
        fetchComments(post_id); 
    }
    ,[post_id]);

    return (
        <> 
            <div className={"comments"}>
              {comments.map( comment => (
                <div className="comment" id = {`comment-${comment.comment_id}`}>
                    <div className="comment-head">
                        <div className="comment-head-left">
                            <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                            <h6>{comment.username}</h6>
                        </div>
                        <div>
                            {/* <p className="comment-time">10m</p> */}
                            <p className="comment-time">{moment(comment._date).fromNow()}</p>
                        </div>
                    </div>
                    <div className="comment-content">
                        <p>{comment.content}</p>
                    </div>
                </div>
              ))}  
                <div className="comment-input-body">
                    <input type="text" className="comment-input" id={`comment-input-${post_id}`}/>
                    <button onClick={handleComment}>comment</button>
                </div>
            </div>
        </>
    );
}
 
export default Comments;