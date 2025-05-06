import React from 'react';
import '../assets/styles/HomePage.css';
import introVid from '../assets/videos/intro_video.mp4';
import entranceImg from '../assets/images/entrance_img.jpg';

function HomePage() {
    return(
        <div className='main-page'>

            <video className='introVid' autoPlay loop muted>
                <source src={introVid} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='card_and_info'>
                <div className='card aboutUsCard py-4'>
                    <p className='h3 mb-6'>Comfortable rooms for everyone!</p>
                    <button className='btn btn-outline-dark w-50 mx-auto p-2'>Check availabilty</button>
                </div>
                <div className='px-5'>
                    <h1 className='mt-4'>Stay With Us</h1>
                    {/* TODO Schedule Booking */}
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi facilisis ornare sodales. Morbi dapibus sem vulputate diam tincidunt, non malesuada nunc semper. Nam accumsan urna eget dolor euismod facilisis. Donec.</p>
                </div>
            </div>
            
                
        </div>
    );
}

export default HomePage;


// Video by Tom Fisk from Pexels: https://www.pexels.com/video/exterior-design-of-a-modern-high-rise-buildings-3648257/