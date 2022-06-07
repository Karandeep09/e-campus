import { BiLike, BiComment, BiEdit, BiTrash } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import Tags from "./Tags";
import authHeader from "../sevices/authHeader.service";
import { useNavigate } from "react-router-dom";
import blogService from "../sevices/blogedit.service";
import Comments from "./Comments";
const moment = require('moment');
// import  axios  from "axios";
const Blog = ({ posts , fetchPosts }) => {  

    const likeinit= (post_id) =>{
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({post_id : post_id})
        };
        fetch("http://127.0.0.1:4000/auth/likestate", requestOptions) 
        .then(response => {console.log("B",response);return response.json();})
        .then(data => {
            console.log("D",data);
            if(data.liked === 1){
                document.querySelector(`.blog-likes.like-${post_id}`).classList.add('liked');
            }
            document.querySelector('#count-'+post_id).innerHTML = data.count;
        })
        // return ();
    }
    const handleLike = (post_id) => {
        // alert("Hi");
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({post_id : post_id})
        };
        
        console.log(requestOptions);
        let todo = "like";
        if(document.querySelector(`.blog-likes.like-${post_id}`).classList.contains('liked')){
            todo = "unlike";
        }
        fetch(`http://127.0.0.1:4000/auth/${todo}`, requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                if(data.toggle == 1)
                document.querySelector(`.blog-likes.like-${post_id}`).classList.toggle('liked');
                document.querySelector('#count-'+post_id).innerHTML = data.count;
                console.log(data);
            });
    //     if(document.querySelector('.blog-likes').classList.contains('liked'))
    //     document.querySelector('#count-'+post_id).innerHTML = "  1";
    //    else
    //     document.querySelector('#count-'+post_id).innerHTML = "  ";
     }
    
    let navigate = useNavigate();
    const handleDelete = (id) =>{
        console.log(id);
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({id : id})
        };
        console.log(requestOptions);
        fetch('http://127.0.0.1:4000/auth/delete', requestOptions)
            .then(async response => {
                response.json();
                fetchPosts();
            })
            .then(data => {
                console.log(data);
            });
    }
    const handleEdit = (posts) => {
        // alert("Ho");
        const user = JSON.parse(localStorage.getItem('user'));
            if(user && user.username === posts.username){
            blogService.setblog(posts);
            navigate("/blogedit");
        }
        else{
            console.log("Forbidden");
        }
    }
       const EditAndDelete = (post)=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && user.username === post.username){
            return (
                <div className="blog-header-icons">
                    <div onClick = {()=>handleEdit(post)}>
                        <BiEdit />
                    </div>
                    <div onClick={() => handleDelete(post.post_id)}>
                        <BiTrash />
                    </div>
                </div>
            );
        }
        return (<></>);
 }

    function handleCommentShow(post_id){
        document.querySelector(`.comments.comm-${post_id}`).classList.toggle('display-comment');
    }

    function openProfile(username){
        // alert(username);
        navigate('/profile', {state : {username : username}});    
    }

    return (
        <>
          {posts.map(post => (
            <div className="blog">
              <div className="blog-header">
                    <div className="blog-header-left">
                        <div className="blog-header-img" >
                            <img onClick={ () => {openProfile(post.username);} } src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                        </div>
                        <div className="blog-header-profile">
                            <h6 onClick={ () => {openProfile(post.username);} }>{post.nm}</h6>
                            <p>{post.branch} {", "} {post.batch}</p>
                            <p className="blog-time">{moment(post._date).fromNow()}</p>
                        </div>
                    </div>
                     {EditAndDelete(post)}
                </div>

              <div className="blog-body">
                  <div className="blog-heading">
                      {/* <p>{post.post_id}</p> */}
                      <p><strong>{post.title}</strong></p>
                  </div>
                  <div className="blog-content">
                      <p dangerouslySetInnerHTML={{ __html: post.content }}>
                      </p>
                  </div>
                  <div className="blog-tags">
                      <Tags tags={post.tags} />
                  </div>
              </div>
              <div className="blog-footer">
              <div className={`blog-likes like-${post.post_id}`} onClick={()=>{handleLike(post.post_id)}}>
                      <AiFillLike className="like-icon"/>
                      <p>Like</p>
                      <p id ={`count-${post.post_id}`}></p>
              </div>
                  {likeinit(post.post_id)}
                  <div className="blog-comment" onClick={()=>{handleCommentShow(post.post_id);}}>
                      <BiComment />
                      <p>Comment</p>
                  </div>
              </div>
              <div className={`comments comm-${post.post_id}`}>
                  <Comments post_id={post.post_id} /> 
                  {/* getcomments */}
              </div>
          </div>
          ))}
            
        </>
    );
}
 
export default Blog;