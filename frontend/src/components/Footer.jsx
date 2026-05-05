import { Link } from 'react-router-dom';
import { React } from "react";
import '../assets/styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className='top_box'>
        <div className='left_footer_box footer_box'>
          <h2>Mike's Hotel</h2>
          <div className='socials_buttons_container'>
            <Link to="#" className='btn btn-outline-light socials_buttons'>Twitter</Link>
            <Link to="#" className='btn btn-outline-light socials_buttons'>Instagram</Link>
            <Link to="#" className='btn btn-outline-light socials_buttons'>Youtube</Link>
            <Link to="#" className='btn btn-outline-light socials_buttons'>Facebook</Link>
          </div>
        </div>
        <div className='right_footer_box footer_box'>
          <p>
            Mike's Hotel is a luxury hotel, that offers peace and tranquility. We have an in-house spa at our hotel and we often have fun experiences you can enjoy. We have wine under the sunset, elephant trails, SPAs and muh more. Come to Mike's Hotel for a five star experience and stay for the memories.
          </p>
          <button className='btn btn-light all_offers_btn'>See all Offers</button>
        </div>

      </div>

      <div className='bottom_box'>
        <p><Link to="#" className='myLink text-white'>Terms and conditions</Link></p>
        <p className='text-white'>Copyright Reserved &copy; Mtho</p>
        <p><Link to="#" className='myLink text-white'>Cookies Policy</Link></p>
      </div>
    </footer>
  );
}

export default Footer;