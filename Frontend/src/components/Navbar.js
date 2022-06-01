import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import IsLogged from '../sevices/IsLoggedIn.service';
import { BiLogOut } from "react-icons/bi";

const Navbar = ( {logged} ) => {
    // const [isLogged, setIsLogged] = useState(false);
    // useEffect(() => {
    //     if(IsLogged())
    //         setIsLogged(true);
    // },[]);
    return (
        <>
            <div id="menu" className="nav">
                <div className="nav-section">
                    <ul>
                        <li><Link to="/"><strong className='logo'>E-Campus</strong></Link></li>
                    </ul>
                </div>
                <nav className="nav-section">
                    <ul>
                        <li><Link to="/bloglist">Blogs</Link></li>
                        <li><Link to="/people">People</Link></li>
                        <li><Link to="/addblog">AddBlog</Link></li>
                        <li><Link to="/about">About</Link></li>
                        {!logged ? <li><Link to="/login">Login</Link></li> 
                                    : <> <li><Link to="/profile">Profile</Link></li>
                                        <li><Link to="/signout"><BiLogOut className='logout-icon' /></Link></li> </> }
                    </ul>
                </nav>
            </div>
        </>
    );
}
 
export default Navbar;