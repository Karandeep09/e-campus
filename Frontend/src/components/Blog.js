import { BiLike, BiComment, BiEdit, BiTrash } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import Tags from "./Tags";
import authHeader from "../sevices/authHeader.service";
import { useNavigate } from "react-router-dom";
const Blog = ({ posts , fetchPosts }) => {  

    const handleLike = () => {
        document.querySelector('.blog-likes').classList.toggle('liked');
    }

    const navigate = useNavigate();
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

    return (
        <>
          {posts.map(post => (
            <div className="blog">
              <div className="blog-header">
                    <div className="blog-header-left">
                        <div className="blog-header-img">
                            <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                        </div>
                        <div className="blog-header-profile">
                            <h6>{post.nm}</h6>
                            <p>Information Technology, 2022</p>
                        </div>
                    </div>
                    <div className="blog-header-icons">
                        <div>
                            <BiEdit />
                        </div>
                        <div onClick={() => handleDelete(post.post_id)}>
                            <BiTrash />
                        </div>
                    </div>
                </div>

              <div className="blog-body">
                  <div className="blog-heading">
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
                  <div className="blog-likes" onClick={handleLike}>
                      <AiFillLike className="like-icon" />
                      <p>Like</p>
                  </div>
                  <div className="blog-comment">
                      <BiComment />
                      <p>Comment</p>
                  </div>
              </div>
          </div>
          ))}
            
        </>
    );
}
 
export default Blog;