import { BiLike, BiComment } from "react-icons/bi";

const Blog = ({ posts }) => {
    return (
        <>
          {posts.map(post => (
              <div className="blog">
              <div className="blog-header">
                  <div className="blog-profile-img">
                      <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                  </div>
                  <div className="blog-profile-name">
                      <p>{post.username}</p>
                  </div>
              </div>
              <div className="blog-body">
                  <div className="blog-content">
                      <p dangerouslySetInnerHTML={{ __html: post.content }}>
                      </p>
                  </div>
                  <div className="blog-tags">
                      <p>#lorem</p>
                      <p>#epsum</p>
                  </div>
              </div>
              <div className="blog-footer">
                  <div className="blog-likes">
                      <BiLike />
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