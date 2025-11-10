import { useCallback, useState, useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../assets/styles/Reservations.css';

function Reservation() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const passedBooking = location.state?.booking;

    const [loading, setLoading] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [booking, setBooking] = useState(passedBooking || null);
    const [error, setError] = useState('');

    const qrCanvasRef = useRef(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    // Wrap fetchBookingByRef in useCallback to prevent re-creation on every render
    const fetchBookingByRef = useCallback(async (ref) => {
        setLoading(true);
        setError(''); // Clear previous errors
        try {
            const response = await fetch(`${BASE_URL}/bookings/${ref}`);
            if (!response.ok) {
                console.log(`Status: ${response.status}`);
                throw new Error('Booking not found');
            }

            const data = await response.json();
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No booking found with this reference number.');
            }

            setBooking(data);
        } catch (err) {
            console.error('Error fetching booking:', err);
            setBooking(null);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [BASE_URL]);

    // Fetch booking if ref is in query or passed via state
    useEffect(() => {
        const refParam = searchParams.get('ref');
        if (refParam) {
            setReferenceNumber(refParam);
            fetchBookingByRef(refParam);
        } else if (passedBooking) {
            setReferenceNumber(passedBooking.reference_number || '');
        }
    }, [searchParams, passedBooking, fetchBookingByRef]);

    // Generate QR code when booking is available
    useEffect(() => {
        if (booking && qrCanvasRef.current) {
            const qrUrl = `https://mikes-hotel-revised.vercel.app/reservation?ref=${booking.reference_number}`;
            QRCode.toCanvas(qrCanvasRef.current, qrUrl, (error) => {
                if (error) console.error(error);
            });
        }
    }, [booking]);

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

        try {
            const qrImageData = await QRCode.toDataURL(qrUrl);

            doc.setFontSize(20);
            doc.setTextColor(40, 40, 40);
            doc.text("Mike's Hotel", 15, 20);
            doc.setFontSize(14);
            doc.text("Booking Confirmation", 15, 30);

            doc.setDrawColor(100);
            doc.line(15, 40, 195, 40);

            doc.addImage(qrImageData, 'PNG', 160, 10, 35, 35);

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
                    ["Room Price", `ZAR ${booking.roomprice}`],
                    ["Total Price", `ZAR ${booking.totalprice}`],
                    ["Reference Number", booking.reference_number],
                ],
                styles: { fontSize: 12, cellPadding: 4 },
                headStyles: { fillColor: [60, 60, 60], textColor: [255, 255, 255] },
                margin: { left: 15, right: 15 },
            });

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(
                "Thank you for choosing Mike's Hotel. We look forward to your stay.",
                15,
                doc.lastAutoTable.finalY + 15
            );

            doc.save(`booking_${booking.reference_number}.pdf`);
        } catch (err) {
            console.error("QR code generation or PDF export failed:", err);
            alert("Could not generate PDF. Please try again.");
        }
    };

    const handleCancelBooking = async () => {
        if (!booking) return;
        const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${BASE_URL}/bookings/${booking.reference_number}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to cancel booking");

            alert("Booking cancelled successfully.");
            setBooking(null);
            setReferenceNumber('');
            setError('');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="reservations-container">
            <h2>Find Your Booking</h2>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Fetching your booking...</p>
                </div>
            ) : !booking && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className='reservationTextInput'
                        placeholder="Enter your reference number"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        disabled={loading}
                        required
                    />
                    <button type="submit" className='reservationBtn' disabled={loading}>Search</button>
                </form>
            )}

            {error && <div className='roomNotFound'>
                <div className='big-emoticon'>:(</div>
                <h1>{error}</h1>
                <div className='content-description'>I couldn't find a booking to match this reference.</div>
                <div className='further-explanation'>Please check your email and make sure you have entered the correct Reference</div>
                <div className='further-explanation'>Contact support if you can't find your booking!</div>
            </div>}

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
    );
}

export default Reservation;