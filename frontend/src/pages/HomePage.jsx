import React from 'react';
import '../assets/styles/HomePage.css';
import introImg from '../assets/images/entrance_img.jpg';
import introScene from '../assets/videos/intro_scene.mp4';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const homeImages = [
        `https://cdn.pixabay.com/photo/2013/09/25/12/26/entrance-hall-186099_1280.jpg`,
        `https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_1280.jpg`,
        `https://cdn.pixabay.com/photo/2017/08/16/09/45/victoria-falls-2646993_1280.jpg`,
        `https://cdn.pixabay.com/photo/2017/07/31/21/14/architecture-2561129_1280.jpg`,
        `https://cdn.pixabay.com/photo/2017/06/09/09/28/swimming-pool-2386258_1280.jpg`,
        `https://cdn.pixabay.com/photo/2017/03/10/10/07/bathroom-2132342_1280.jpg`,

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