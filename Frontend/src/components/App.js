import React, { useState, useEffect } from 'react';
import '../css/app.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import About from './About';
import BlogList from './BlogList';
import Login from './Login';
import Navbar from './Navbar';
import AddBlog from './AddBlog';
import Error404 from './Error404';
import Signout from './Signout';
import People from './People';
import Profile from './Profile';
import IsLogged from '../sevices/IsLoggedIn.service';

export const BlogContext = React.createContext();

function App() {
  const [blogs, setBlogs] = useState(sampleBlogs);

  const blogContextValue = {
    blogs
  };

  const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        if(IsLogged())
            setIsLogged(true);
    },[isLogged]);

  return (
    <>
    <BlogContext.Provider value={blogContextValue} >
      <Router>
        <Navbar logged={isLogged} />
          <Routes>
            <Route exact path="/" element={ <BlogList /> }/>
            <Route path="/bloglist" element={ <BlogList /> } />
            <Route path="/about" element={ <About /> } />
            <Route path="/addblog" element={ <AddBlog /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signout" element={ <Signout />} />
            <Route path="/people" element={ <People /> } />
            <Route path="/profile" element={ <Profile /> } />
            <Route path="*" element={ <Error404 /> } />
          </Routes>
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