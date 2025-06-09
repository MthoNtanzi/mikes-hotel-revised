import { Link } from 'react-router-dom';
import React from "react";
import '../assets/styles/Header.css';

function Header() {

     // Close the navbar when a link is clicked
    const closeNavbar = () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        // Only proceed if elements exist (mobile view)
        if (navbarToggler && navbarCollapse) {
            // Check if navbar is currently expanded
            const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                // Close the navbar
                navbarToggler.setAttribute('aria-expanded', 'false');
                navbarCollapse.classList.remove('show');
            }
        }
    };

    return (
        <header className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className="container-fluid">
                <Link to="/" className='navbar-brand' onClick={closeNavbar}>Home</Link>
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
                            <Link className='nav-link' to="/rooms" onClick={closeNavbar}>Rooms</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/experiences" onClick={closeNavbar}>Experiences</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/reservation" onClick={closeNavbar}>View Booking</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
