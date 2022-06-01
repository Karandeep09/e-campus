import React, { useState, useEffect } from 'react';
import Blog from "./Blog";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import { BiSearchAlt } from "react-icons/bi";
import {useNavigate} from 'react-router-dom';

const BlogList = () => {
    const navigate = useNavigate();
    function RenderEditor(){
        navigate("/addblog");
    }
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/users/posts');
        setPosts(res.data);
        setLoading(false);
      };

    useEffect(() => {
        fetchPosts();
      }, []);

            // Get current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        const totalpages = Math.ceil(posts.length / postsPerPage);
            // Change page
        const paginate = event => setCurrentPage(event.selected+1);

    return (
        <div className='blog-container'>

            <div className='search-blogs'>
                <h5>Search Profiles <BiSearchAlt /></h5>
                <div className="search-blogs-body">
                    <form>
                        <input type="text" name="search-blog" id="search-blog" />
                    </form>
                </div>
            </div>

            <Blog posts={currentPosts} fetchPosts={fetchPosts}
             />
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