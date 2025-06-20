import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../assets/styles/Reservations.css';

function Reservations() {

    const location = useLocation();
    const passedBooking = location.state?.booking;

    const [referenceNumber, setReferenceNumber] = useState('');
    const [booking, setBooking] = useState(passedBooking || null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (passedBooking) {
            setReferenceNumber(passedBooking.reference_number || '');
        }
    }, [passedBooking]);

    useEffect(() => {
        if (booking) {
            QRCode.toCanvas(document.getElementById('qr-canvas'), `http://localhost:5173/reservations?ref=${booking.reference_number}`, function (error) {
                if (error) console.error(error);
            });
        }
    }, [booking]);

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

    const handleDownloadPDF = () => {
        if (!booking) return;

        const doc = new jsPDF();
        doc.text("Booking Confirmation", 20, 20);

        autoTable(doc, {  // Use autoTable directly
            startY: 30,
            head: [["Field", "Value"]],
            body: [
                ["Guest Name", booking.guestname],
                ["Email", booking.emailaddress],
                ["Check-in", new Date(booking.checkindate).toLocaleDateString()],
                ["Check-out", new Date(booking.checkoutdate).toLocaleDateString()],
                ["Guests", booking.numofguests],
                ["Room Type", booking.roomtype],
                ["Room Price", `R${booking.roomprice}`],
                ["Total Price", `R${booking.totalprice}`],
                ["Reference Number", booking.reference_number],
            ],
        });

        doc.save(`booking_${booking.reference_number}.pdf`);
    };

    const handleCancelBooking = async () => {
        if (!booking) return;
        const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5001/api/bookings/${booking.reference_number}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to cancel booking");

            alert("Booking cancelled successfully.");
            setBooking(null);
            setReferenceNumber('');
        } catch (err) {
            alert(err.message);
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

                        <div className="actions">
                            <button onClick={handleDownloadPDF}>Download PDF</button>
                            <button onClick={handleCancelBooking} className="cancel-btn">Cancel Booking</button>
                            <div style={{ marginTop: '1rem' }}>
                                <p>Scan to view:</p>
                                <canvas id="qr-canvas" />
                            </div>
                        </div>

                    </div>


                )}
            </div>
        </>
    );
}

export default Reservations;