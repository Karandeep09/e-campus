import React from 'react';
const Navbar = () => {
    let url = "";
    return (
        <>
            <div id="menu" className="nav">
                <div className="nav-section">
                    <ul><li><a href={url}>Logo</a></li></ul>
                </div>
                <div className="nav-section">
                    <ul>
                        <li><a href="{url}">Home</a></li>
                        <li><a href="{url}">About</a></li>
                        <li><a href="{url}">Blogs</a></li>
                        <li><a href="{url}">Profile</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
 
export default Navbar;