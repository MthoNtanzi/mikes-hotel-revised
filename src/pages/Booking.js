import { useLocation } from 'react-router-dom';
import '../assets/styles/Booking.css';

function Booking() {
    const location = useLocation();
    const room = location.state;

    if (!room) return <p>No room data provided.</p>;

    return (
        <>
            <div className='bookingDetails'>
                <h1>{room.roomName}</h1>
                <p>{room.roomDetails}</p>
                <img src={room.roomImages[0]} alt={room.roomName} />
                <p>Price: R{room.roomPrice}</p>
                {/* Render other details like amenities etc */}
            </div>    
        </>  
    );
}

export default Booking;

// Insipiration: https://dribbble.com/shots/25716741-Serenity-Hotel-Booking-Details-Page