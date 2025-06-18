import '../assets/styles/Reservations.css';

function Reservations() {

    async function fetchBookingByRef(referenceNumber) {
        try {
            const response = await fetch(`http://localhost:5001/api/bookings/${referenceNumber}`);
            if (!response.ok) {
                throw new Error(`Booking not found (Status: ${response.status})`);
            }
            const booking = await response.json();
            console.log('Booking details:', booking);
            return booking;
        } catch (error) {
            console.error('Error fetching booking:', error);
        }
    }

    // Usage
    fetchBookingByRef('200MTH17'); // Replace with a real reference number

    return (
        <>
        
        </>
    )
}

export default Reservations;