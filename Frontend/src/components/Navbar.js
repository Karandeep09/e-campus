import { Link } from 'react-router-dom';

const Navbar = () => {
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
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
 
export default Navbar;