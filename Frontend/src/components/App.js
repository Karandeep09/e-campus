import React, { useState } from 'react';
import '../css/app.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import About from './About';
import BlogList from './BlogList';
import Login from './Login';
import Navbar from './Navbar';
import AddBlog from './AddBlog';
import Error404 from './Error404';
import SidebarTags from './SidebarTags';

export const BlogContext = React.createContext();

function App() {
  const [blogs, setBlogs] = useState(sampleBlogs);

  const blogContextValue = {
    blogs
  };

  return (
    <>
    <BlogContext.Provider value={blogContextValue} >
      <Router>
        <Navbar />
        <div className='home-layout'>
          <SidebarTags />
          <Routes>
            <Route exact path="/" element={ <BlogList /> }/>
            <Route path="/bloglist" element={ <BlogList /> } />
            <Route path="/about" element={ <About /> } />
            <Route path="/addblog" element={ <AddBlog /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="*" element={ <Error404 /> } />
          </Routes>
          <SidebarTags />
        </div>
      </Router>
    </BlogContext.Provider>
    </>
  );
}

const sampleBlogs = [
  {
    id: 1,
    name: 'Aman Gupta',
    content: 'loren epsum',
    tags: ['KNIT', 'IT']
  },
  {
    id: 2,
    name: 'Aman Agrahari',
    content: 'loren epsum',
    tags: ['KNIT', 'IT']
  }
];

export default App;