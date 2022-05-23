import Blog from "./Blog";
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import { useContext } from "react";
import { BlogContext } from "./App";
import { useState, useEffect } from "react";

import axios from 'axios';
import ReactPaginate from 'react-paginate';

const BlogList = () => {
    const navigate = useNavigate();
    function RenderEditor(){
        navigate("/addblog");
    }

    const blogs = useContext(BlogContext);
    // console.log(blogs['blogs'].forEach(blog => console.log(blog)))

    const [posts, setPosts] = useState(blogs['blogs']);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          const res = await axios.get('http://localhost:4000/users/posts');
          setPosts(res.data);
          setLoading(false);
        };
        fetchPosts();
      }, []);


    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalpages = Math.ceil(posts.length / postsPerPage);
    
    //Change Page
    const paginate = (event) => setCurrentPage(event.selected+1);
    

    return (
        <div className="blog-container">
            {currentPosts.forEach(post => {
                <Blog post={post} />
            })}
            
            <div className='paginator'>
            <ReactPaginate 
               onPageChange={paginate}
               pageRangeDisplayed={postsPerPage}
               pageCount={totalpages}
               renderOnZeroPageCount={null}
               previousLabel="<-"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            </div>
            <AiOutlinePlusCircle className="post-btn" onClick={RenderEditor} />
        </div>
    );
}
 
export default BlogList;