import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../assets/styles/Header.css';
import LogoImg from '../assets/images/hotel_logo.png';

function Header() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`hotel-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-inner">
                <Link to="/" className="nav-brand">
                    <img src={LogoImg} alt="Mike's Hotel Logo" className="nav-logo" />
                </Link>

                <ul className="nav-links">
                    <li><Link to="/rooms" className={isActive('/rooms') ? 'active' : ''}>Rooms</Link></li>
                    <li><Link to="/experiences" className={isActive('/experiences') ? 'active' : ''}>Experiences</Link></li>
                    <li><Link to="/reservation" className={isActive('/reservation') ? 'active' : ''}>View booking</Link></li>
                    <li><Link to="/booking" className="nav-book-btn">Book now</Link></li>
                </ul>

                <button
                    className={`nav-toggle ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span><span></span><span></span>
                </button>
            </div>

            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <Link to="/rooms" className={isActive('/rooms') ? 'active' : ''}>Rooms</Link>
                <Link to="/experiences" className={isActive('/experiences') ? 'active' : ''}>Experiences</Link>
                <Link to="/reservation" className={isActive('/reservation') ? 'active' : ''}>View booking</Link>
                <Link to="/booking">Book now</Link>
            </div>
        </header>
    );
}

export default Header;