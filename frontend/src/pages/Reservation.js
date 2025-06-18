import { useState } from 'react';
import '../assets/styles/Reservations.css';

function Reservations() {

    const [referenceNumber, setReferenceNumber] = useState('');
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState('');

    async function fetchBookingByRef(ref) {
        try {
            const response = await fetch(`http://localhost:5001/api/bookings/${ref}`);
            if (!response.ok) {
                throw new Error(`Booking not found (Status: ${response.status})`);
            }
            const data = await response.json();
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No booking found with this reference number.');
            }
            setBooking(data);
            setError('');
        } catch (err) {
            console.error('Error fetching booking:', err);
            setBooking(null);
            setError(err.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (referenceNumber.trim()) {
            fetchBookingByRef(referenceNumber.trim());
        }
    };


    return (
        <>
            <div className="reservations-container">
                <h2>Find Your Booking</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your reference number"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        required
                    />
                    <button type="submit">Search</button>
                </form>

                {error && <p className="error">{error}</p>}

                {booking && (
                    <div className="booking-details">
                        <h3>Booking Details</h3>
                        <p><strong>Guest Name:</strong> {booking.guestname}</p>
                        <p><strong>Email:</strong> {booking.emailaddress}</p>
                        <p><strong>Check-in:</strong> {new Date(booking.checkindate).toLocaleDateString()}</p>
                        <p><strong>Check-out:</strong> {new Date(booking.checkoutdate).toLocaleDateString()}</p>
                        <p><strong>Guests:</strong> {booking.numofguests}</p>
                        <p><strong>Room Type:</strong> {booking.roomtype}</p>
                        <p><strong>Room Price:</strong> R{booking.roomprice}</p>
                        <p><strong>Total Price:</strong> R{booking.totalprice}</p>
                        <p><strong>Reference Number:</strong> {booking.reference_number}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Reservations;