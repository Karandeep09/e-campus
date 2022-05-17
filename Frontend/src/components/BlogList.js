import Blog from "./Blog";
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';

const BlogList = () => {
    const navigate = useNavigate();
    function RenderEditor(){
        navigate("/addblog");
    }
    return (
        <div className="blog-container">
            <Blog />
            <Blog />
            <Blog />
            <Blog />
            <AiOutlinePlusCircle className="post-btn" onClick={RenderEditor} />
        </div>
    );
}
 
export default BlogList;