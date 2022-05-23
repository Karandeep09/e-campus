import { BiLike, BiComment, BiEdit, BiTrash } from "react-icons/bi";

const Blog = ( {post} ) => {
    return (
        <>
            <div className="blog">
                <div className="blog-header">
                    <div className="blog-header-left">
                        <div className="blog-header-img">
                            <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                        </div>
                        <div className="blog-header-profile">
                            <h6>Aman Gupta</h6>
                            <p>Information Technology, 2022</p>
                        </div>
                    </div>
                    <div className="blog-header-icons">
                        <div>
                            <BiEdit />
                        </div>
                        <div>
                            <BiTrash />
                        </div>
                    </div>
                </div>
                <div className="blog-body">
                    <div className="blog-content">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
        </>
    );
}
 
export default Blog;