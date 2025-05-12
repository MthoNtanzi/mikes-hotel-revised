import { Link } from 'react-router-dom';
import { React } from "react";

function Footer(){
    return (
      <footer className="d-md-flex flex-column">
        <div className='left_footer_box'>
            <p>Tel: 0123456789</p>
            <p>Email: admin@email.com</p>
            <p>Reservations: <Link to="booking.html">click here</Link></p>
        </div>
        <div className='center_footer_box'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.0768961818985!2d28.312376439571384!3d-26.259167615441118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e952291c13740db%3A0x875fadc73272af5b!2sBig%20Top%20Arena%20Carnival%20City!5e0!3m2!1sen!2sza!4v1746775418634!5m2!1sen!2sza" 
            width="400" 
            height="300" 
            style={{ border: 0 }} 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className='right_footer_box'>
            <p>Copyright Reserved &#169 Made by Mtho</p>
        </div>
      </footer>  
    );
}

export default Footer;