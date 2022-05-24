import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import IsLogged from '../sevices/IsLoggedIn.service';

const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        if(IsLogged())
            setIsLogged(true);
    }, []);
    return (
        <>
            <div id="menu" className="nav">
                <div className="nav-section">
                    <ul>
                        <li><Link to="/">E-Campus</Link></li>
                    </ul>
                </div>
                <nav className="nav-section">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/bloglist">Blogs</Link></li>
                        <li><Link to="/addblog">Add-Blog</Link></li>
                        {!isLogged ? <li><Link to="/login">Login</Link></li> 
                                    : <> <li><Link to="/profile">Profile</Link></li>
                                        <li><Link to="/signout">Sign-out</Link></li> </> }
                    </ul>
                </nav>
            </div>
        </>
    );
}
 
export default Navbar;