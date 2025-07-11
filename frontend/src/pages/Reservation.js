import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../assets/styles/Reservations.css';

function Reservation() {

    const location = useLocation();
    const [searchParams] = useSearchParams();
    const passedBooking = location.state?.booking;

    const [referenceNumber, setReferenceNumber] = useState('');
    const [booking, setBooking] = useState(passedBooking || null);
    const [error, setError] = useState('');
    const qrCanvasRef = useRef(null);
    
    useEffect(() => {
        const ref = searchParams.get('ref');
        if (ref) {
            setReferenceNumber(ref);
            fetchBookingByRef(ref);
        } else if (passedBooking) {
            setReferenceNumber(passedBooking.reference_number || '');
        }
    }, []);

    useEffect(() => {
        if (booking && qrCanvasRef.current) {
            const qrUrl = `https://mikes-hotel-revised.vercel.app/reservation?ref=${booking.reference_number}`;

            QRCode.toCanvas(qrCanvasRef.current, qrUrl, function (error) {
                if (error) console.error(error);
            });
        }
    }, [booking]);

    async function fetchBookingByRef(ref) {
        try {
            const response = await fetch(`https://mikes-hotel-revised.onrender.com/api/bookings/${ref}`);
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

    const handleDownloadPDF = async () => {
    if (!booking) return;

    const doc = new jsPDF();

    const qrUrl = `https://mikes-hotel-revised.vercel.app/reservation?ref=${booking.reference_number}`;

    // Hotel name and title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Mike's Hotel", 55, 20);
    doc.setFontSize(14);
    doc.text("Booking Confirmation", 55, 30);

    // Horizontal line
    doc.setDrawColor(100);
    doc.line(15, 40, 195, 40); // (x1, y1, x2, y2)

    // Add QR code top right
    doc.addImage(qrImageData, 'PNG', 160, 10, 35, 35);

    // Booking Details Table
    autoTable(doc, {
        startY: 50,
        head: [["Field", "Details"]],
        body: [
            ["Guest Name", booking.guestname],
            ["Email", booking.emailaddress],
            ["Check-in", new Date(booking.checkindate).toLocaleDateString()],
            ["Check-out", new Date(booking.checkoutdate).toLocaleDateString()],
            ["Guests", booking.numofguests],
            ["Room Type", booking.roomtype],
            ["Room Price", `ZAR${booking.roomprice}`],
            ["Total Price", `ZAR${booking.totalprice}`],
            ["Reference Number", booking.reference_number],
        ],
        styles: {
            fontSize: 12,
            cellPadding: 4,
        },
        headStyles: {
            fillColor: [60, 60, 60],
            textColor: [255, 255, 255],
        },
        margin: { left: 15, right: 15 },
    });

    // Footer message
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for choosing Mike’s Hotel. We look forward to your stay.", 15, doc.lastAutoTable.finalY + 15);

    doc.save(`booking_${booking.reference_number}.pdf`);
};

    const handleCancelBooking = async () => {
        if (!booking) return;
        const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`https://mikes-hotel-revised.onrender.com/api/bookings/${booking.reference_number}`, {
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
                {!booking && (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className='reservationTextInput'
                            placeholder="Enter your reference number"
                            value={referenceNumber}
                            onChange={(e) => setReferenceNumber(e.target.value)}
                            required
                        />
                        <button type="submit" className='reservationBtn'>Search</button>
                    </form>
                )}

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
                            <button onClick={handleDownloadPDF} className="btn btn-dark me-2 mb-2">Download PDF</button>
                            <button onClick={handleCancelBooking} className="cancel-btn btn btn-dark mb-2">Cancel Booking</button>
                            <div style={{ marginTop: '1rem' }}>
                                <p className='text-center'>Scan to view:</p>
                                <canvas ref={qrCanvasRef} />
                            </div>
                        </div>

                    </div>


                )}
            </div>
        </>
    );
}

export default Reservation;