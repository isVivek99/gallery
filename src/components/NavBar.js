
import React from 'react';
import './NavBar.css';

const NavBar = ()=> {

    return(
        <nav className="navbar">
            <h1>Gallery-App</h1>
            <div className="links">
            <button className="logout__button" >logout</button>
            </div>
        </nav>
        

    );
}

export default NavBar;