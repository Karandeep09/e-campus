import React from 'react';
import '../css/app.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import About from './About';
import BlogList from './BlogList';
import Login from './Login';
import Navbar from './Navbar';
import AddBlog from './AddBlog';
import Error404 from './Error404';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={ <BlogList /> }/>
          <Route path="/bloglist" element={ <BlogList /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/addblog" element={ <AddBlog /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="*" element={ <Error404 /> } />
        </Routes>
      </Router>
    </>
  );
}
export default App;