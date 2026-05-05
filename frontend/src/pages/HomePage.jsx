import React from 'react';
import '../assets/styles/HomePage.css';
import introImg from '../assets/images/entrance_img.jpg';
import introScene from '../assets/videos/intro_scene.mp4';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const homeImages = [
        `https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
        `https://plus.unsplash.com/premium_photo-1661907977530-eb64ddbfb88a?q=80&w=2121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
        `https://images.unsplash.com/photo-1625244695851-1fc873f942bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
        `https://plus.unsplash.com/premium_photo-1675615667752-2ccda7042e7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
        `https://plus.unsplash.com/premium_photo-1675615667609-9470809c201c?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
        `https://plus.unsplash.com/premium_photo-1675615949706-d241c824a3a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,

    ];

    return (
        <div className='main-page'>


            {/* Intro video */}
            <video className='introVid' autoPlay loop muted playsInline preload="auto">
                <source src={introScene} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Intro Image */}
            <img
                src={introImg}
                alt="Hotel scene"
                className='introImg'
                loading="lazy"
            />


            <div className='card_and_info'>
                <div className='card aboutUsCard py-4'>
                    <p className='h3 mb-6'>Comfortable rooms for you!</p>
                    <button className='book-btn' onClick={() => navigate('/rooms')}>Check availabilty</button>
                </div>
                <div className='px-5'>
                    <h1 className='mt-4'>Stay With Us</h1>
                    {/* TODO Schedule Booking */}
                    <p>Welcome to Mike's Hotel. We are pleased to host you. Whether for business or pleasure you can find comfort at Mike's Hotel, where you will find the best luxury accomadation known to man.</p>
                </div>
            </div>

            {/* lobby and room images */}
            <div className="gallery-grid">
                {homeImages.map((src, index) => (
                    <div className="gallery-item" key={index}>
                        <img
                            src={src}
                            alt={`Hotel lobby ${index + 1}`}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>


        </div>
    );
}

export default HomePage;


// Video by Tom Fisk from Pexels: https://www.pexels.com/video/exterior-design-of-a-modern-high-rise-buildings-3648257/