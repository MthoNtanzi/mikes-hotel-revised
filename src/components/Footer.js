import { Link } from 'react-router-dom';
import { React } from "react";
import '../assets/styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className='top_box'>
        <div className='left_footer_box footer_box'>
          <h2>Mike's Hotel</h2>
          <div>
            <Link to="#" className='btn btn-outline-light socials_buttons me-2'>Twitter</Link>
            <Link to="#" className='btn btn-outline-light socials_buttons me-2'>Instagram</Link>
            <Link to="#" className='btn btn-outline-light socials_buttons me-2'>Youtube</Link>
            <Link to="#" className='btn btn-outline-light socials_buttons'>Facebook</Link>
          </div>
        </div>
        <div className='right_footer_box footer_box'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium enim nisl, vel elementum ex pellentesque vel. Donec quis est viverra, molestie mauris vitae, faucibus sem. Ut vel nibh congue, facilisis justo ut, ullamcorper nunc.
          </p>
          <button className='btn btn-light all_offers_btn'>See all Offers</button>
        </div>

      </div>

      <div className='bottom_box'>
        <p><Link to="#" className='myLink text-white'>Terms and conditions</Link></p>
        <p className='text-white'>Copyright Reserved &copy; Made by Mtho</p>
        <p><Link to="#" className='myLink text-white'>Cookies Policy</Link></p>
      </div>
    </footer>
  );
}

export default Footer;