import { Link } from 'react-router-dom';
import React from "react";
import '../assets/styles/Header.css';

function Header() {
    return (
        <header className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className="container-fluid">
                <Link to="/" className='navbar-brand'>Home</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavDropdown" 
                    aria-controls="navbarNavDropdown" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className='nav-link' to="/rooms">Rooms</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/booking">Booking</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
