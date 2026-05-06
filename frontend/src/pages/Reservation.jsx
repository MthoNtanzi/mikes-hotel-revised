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

    const fetchBookingByRef = useCallback(async (ref) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${BASE_URL}/bookings/${ref}`);
            if (!response.ok) throw new Error('Booking not found');
            const data = await response.json();
            if (!data || Object.keys(data).length === 0) throw new Error('No booking found with this reference number.');
            setBooking(data);
        } catch (err) {
            setBooking(null);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [BASE_URL]);

    useEffect(() => {
        const refParam = searchParams.get('ref');
        if (refParam) {
            setReferenceNumber(refParam);
            fetchBookingByRef(refParam);
        } else if (passedBooking) {
            setReferenceNumber(passedBooking.reference_number || '');
        }
    }, [searchParams, passedBooking, fetchBookingByRef]);

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
        if (referenceNumber.trim()) fetchBookingByRef(referenceNumber.trim());
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
                headStyles: { fillColor: [119, 43, 43], textColor: [245, 230, 200] },
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
            console.error("PDF export failed:", err);
            alert("Could not generate PDF. Please try again.");
        }
    };

    const handleCancelBooking = async () => {
        if (!booking) return;
        const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirmDelete) return;
        try {
            const res = await fetch(`${BASE_URL}/bookings/${booking.reference_number}`, { method: 'DELETE' });
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

            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Fetching your booking...</p>
                </div>
            )}

            {!loading && !booking && (
                <form onSubmit={handleSubmit} className="search-form">
                    <div className="search-form-header">
                        <h3>View Your Reservation</h3>
                        <p>Enter the reference number from your confirmation email to view or manage your booking.</p>
                    </div>
                    <div className="search-form-body">
                        <input
                            type="text"
                            placeholder="e.g. MH-20250504-00042"
                            value={referenceNumber}
                            onChange={(e) => setReferenceNumber(e.target.value)}
                            disabled={loading}
                            required
                        />
                        <button type="submit" className="btn-search" disabled={loading}>Search</button>
                    </div>
                </form>
            )}

            {error && (
                <div className="roomNotFound">
                    <div className="big-emoticon">:(</div>
                    <h1>{error}</h1>
                    <p className="content-description">I couldn't find a booking to match this reference.</p>
                    <p className="further-explanation">Please check your email and make sure you entered the correct reference number.</p>
                    <p className="further-explanation">Contact support if you can't find your booking.</p>
                </div>
            )}

            {booking && (
                <div className="booking-card">
                    <div className="booking-card-header">
                        <div>
                            <h3>Booking Confirmed</h3>
                            <p>Welcome back, {booking.guestname}</p>
                        </div>
                        <span className="booking-ref">{booking.reference_number}</span>
                    </div>

                    <div className="booking-card-body">
                        <div className="booking-grid">
                            <div className="booking-field">
                                <label>Check-in</label>
                                <span>{new Date(booking.checkindate).toLocaleDateString()}</span>
                            </div>
                            <div className="booking-field">
                                <label>Check-out</label>
                                <span>{new Date(booking.checkoutdate).toLocaleDateString()}</span>
                            </div>
                            <div className="booking-field">
                                <label>Room Type</label>
                                <span>{booking.roomtype}</span>
                            </div>
                            <div className="booking-field">
                                <label>Guests</label>
                                <span>{booking.numofguests}</span>
                            </div>
                            <div className="booking-field">
                                <label>Email</label>
                                <span>{booking.emailaddress}</span>
                            </div>
                            <div className="booking-field">
                                <label>Room Price</label>
                                <span>ZAR {booking.roomprice}</span>
                            </div>
                        </div>

                        <div className="booking-total">
                            <label>Total Amount</label>
                            <span>ZAR {booking.totalprice}</span>
                        </div>

                        <div className="booking-qr">
                            <canvas ref={qrCanvasRef} />
                            <p>Scan to view booking online</p>
                        </div>
                    </div>

                    <div className="booking-card-footer">
                        <button onClick={handleDownloadPDF} className="btn-download">Download PDF</button>
                        <button onClick={handleCancelBooking} className="btn-cancel">Cancel Booking</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reservation;