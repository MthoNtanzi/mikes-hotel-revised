import React, { useState } from 'react';
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

    const [formData, setFormData] = useState({
        experience: '',
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 1,
        specialRequests: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        // Reset form after submission
        setFormData({
            experience: '',
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            guests: 1,
            specialRequests: ''
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000);
    };

    return (
        <>

            <div className='experiencesTitle'>
                <h1>Experiences</h1>
                <p>Mike's Hotel is your home filled with amazing sights and adventures for you. Find joy, rest and enjoy your stay with our loving staff that will make your experience a memorable one.</p>
            </div>
            <h1 className='main_heading'>Experiences near Mike's Hotel</h1>
            <div className='experiencesMain'>
                {experiences.map((exp) => (
                    <div className='image_and_text' key={exp.id}>
                        <div className='experience_image'>
                            <img src={exp.image} alt={exp.name} loading="lazy" />
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

                <div className='p-5'>
                    <div className='booking-form-container'>
                    <h2>Book an experience</h2>
                    {isSubmitted ? (
                        <div className="alert alert-success">
                            Thank you! Your booking request has been submitted. Show your hotel reference number when you get to the venue to enjoy the experience.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="booking-form">
                            <div className="form-group">
                                <label htmlFor="experience">Select Experience</label>
                                <select 
                                    id="experience" 
                                    name="experience" 
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- Choose an experience --</option>
                                    {experiences.map(exp => (
                                        <option key={exp.id} value={exp.name}>
                                            {exp.name} (R{exp.cost})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input 
                                        type="date" 
                                        id="date" 
                                        name="date" 
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="time">Preferred Time</label>
                                    <input 
                                        type="time" 
                                        id="time" 
                                        name="time" 
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="guests">Number of Guests</label>
                                    <input 
                                        type="number" 
                                        id="guests" 
                                        name="guests" 
                                        min="1"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="specialRequests">Special Requests</label>
                                <textarea 
                                    id="specialRequests" 
                                    name="specialRequests" 
                                    rows="3"
                                    value={formData.specialRequests}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Submit Booking Request
                            </button>
                        </form>
                    )}
                </div>
                </div>

            </div>

        </>
    );
}

export default Experiences;