import React from 'react';
import '../assets/styles/Experiences.css';

function Experiences() {
    const experiences = [
        {
            id: 1,
            name: "SPA",
            times: {
                start: "09:00",
                end: "16:00"
            },
            cost: 600,
            currency: "ZAR",
            duration: "45 mins",
            description: "Our Spa reflects the environment that surrounds it - are you ready for the ultimate relaxation. Our spa opens up on to an outdoor pool and private garden.",
            image: "https://cdn.pixabay.com/photo/2023/10/28/11/21/ai-generated-8347190_1280.png"
        },
        {
            id: 2,
            name: "SUNSET WINE INDULGENCE",
            times: {
                start: "18:00",
                end: "late"
            },
            cost: 1500,
            currency: "ZAR",
            duration: null, // Optional field - null when not provided
            description: "Perfect for travellers chasing the sunset. We have some of the best wines paired with the most unforgettable meals known to man. This experience is only 30 mins away from the Hotel.",
            image: "https://images.pexels.com/photos/15611840/pexels-photo-15611840/free-photo-of-pouring-wine-to-woman-glass-in-sunlight-and-with-town-behind.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            id: 3,
            name: "ELEPHANT EXPERIENCE",
            times: {
                start: "09:00",
                end: "16:00"
            },
            cost: 900,
            duration: "1 hour",
            description: "Get close and personal with our resident elephants. It gives you the chance to learn about African Elephants, both wild and habituated as you interact and feed these gentle giants.",
            image: "https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            id: 4,
            name: "WAR MEMORIAL",
            times: {
                start: "09:00",
                end: "16:30"
            },
            cost: 100,
            currency: "ZAR",
            duration: null,
            description: "Memorials, of course, have more than one use. They serve to remind us of what is past, of great deeds of heroism and sacrifice; they also serve as a pointer and sometimes as a warning to the future.",
            image: "https://www.theheritageportal.co.za/sites/default/files/styles/adaptive/public/Ditsong%20Museum%20of%20Military%20History%20-%20Sourced%20by%20Kathy%20Munro.png?itok=eFKKyCHC"
        }
    ];


    return (
        <>

            <div className='experiencesTitle'>
                <h1>Experiences</h1>
                <p>Mike's Hotel is your home filled with amazing sights and adventures for you. Find joy, rest and enjoy your stay with our loving staff that will make your experience a memorable one.</p>
            </div>
            <h1>Experiences near Mike's Hotel</h1>
            <div className='experiencesMain'>
                {experiences.map((exp) =>(
                    <div className='image_and_text' key={exp.id}>
                        <div className='experience_image'>
                            <img src={exp.image} alt={exp.name}/>
                        </div>
                        <div className='experience_text'>
                            <h2>{exp.name}</h2>
                            <p>{exp.description}</p>
                            <p><strong>Time:</strong> {exp.times.start} - {exp.times.end}</p>
                            <p><strong>Cost:</strong> R{exp.cost}</p>
                            {exp.duration && <p><strong>Duration:</strong> {exp.duration}</p>}
                        </div>
                    </div>
                ))}
                
            </div>

        </>
    );
}

export default Experiences;