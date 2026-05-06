import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format, differenceInDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { faMugSaucer, faChevronDown, faShirt, faBath, faUtensils, faWifi, faCar, faDumbbell, faSnowflake, faClock, faCircleExclamation, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/styles/Booking.css';
import '../assets/styles/global.css';

function Booking() {
    const location = useLocation();
    const room = location.state;

    const [images, setImages] = useState(room.images);
    const [guestName, setGuestName] = useState('');
    const [email, setEmail] = useState('');
    const [guests, setGuests] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const handleImageClick = (index) => {
        if (index === 0) return;
        const newImages = [...images];
        [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
        setImages(newImages);
    };

    const handleBooking = async () => {
        if (!guestName || !email) {
            alert("Please enter your name and email.");
            return;
        }

        const roomTypeMap = {
            'Single Room': 'single',
            'Double Room': 'double',
            'Presidential Suite': 'suite'
        };

        const payload = {
            emailAddress: email,
            checkInDate: selection[0].startDate.toISOString().split('T')[0],
            checkOutDate: selection[0].endDate.toISOString().split('T')[0],
            numOfGuests: Number(guests),
            guestName: guestName,
            roomType: roomTypeMap[room.name],
            roomPrice: room.price,
            totalPrice: room.price * effectiveNumberOfDays
        };

        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                console.log("API Error Response:", data);
                throw new Error(data.message || "Booking failed");
            }
            navigate("/reservation", { state: { booking: data } });
        } catch (err) {
            console.error('Booking error:', err);
            alert(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const [showCalendar, setShowCalendar] = useState(false);
    const [selection, setSelection] = useState([
        { startDate: new Date(), endDate: new Date(), key: 'selection' }
    ]);

    if (!room) return <p>No room data provided.</p>;

    const numberOfDays = differenceInDays(selection[0].endDate, selection[0].startDate);
    const effectiveNumberOfDays = numberOfDays === 0 ? 1 : numberOfDays;

    const handleSelect = (ranges) => setSelection([ranges.selection]);

    const amenityLabels = {
        coffeeMaker: "Coffee Maker",
        bathRobes: "Bath Robes",
        bathTowels: "Bath Towels",
        breakfast: "Breakfast",
        wifi: "Wi-Fi",
        parking: "Parking",
        gymAccess: "Gym Access",
        airConditioner: "Air Conditioner"
    };

    const amenityIcons = {
        coffeeMaker: faMugSaucer,
        bathRobes: faShirt,
        bathTowels: faBath,
        breakfast: faUtensils,
        wifi: faWifi,
        parking: faCar,
        gymAccess: faDumbbell,
        airConditioner: faSnowflake
    };

    return (
        <>
            <div className="heroSection booking">
                <h1>Book your Stay</h1>
                <p>You have chosen to stay in the {room.name}. View the room offerings and amenities and book your stay.</p>
            </div>

            <div className='booking-page'>
                {/* Image Grid */}
                <div className="roomImages">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={room.name}
                            className={`roomImg${idx + 1}`}
                            onClick={() => handleImageClick(idx)}
                            style={{ cursor: 'pointer' }}
                            loading="lazy"
                        />
                    ))}
                </div>
                <p className='text-center text-secondary p-0' id='scroll_images'>Scroll to the right to view more</p>

                {/* Main content */}
                <div className='room-content'>

                    {/* Left: description, amenities, hotel info */}
                    <div className='room-desc'>

                        <div className='desc-card'>
                            <h1>{room.name}</h1>
                            <p>{room.description}</p>
                        </div>

                        <div className='desc-card'>
                            <h4>Amenities</h4>
                            <hr />
                            <div className='amenity-grid'>
                                {Object.entries(room.amenities)
                                    .filter(([_, count]) => count > 0)
                                    .map(([amenity, count]) => (
                                        <div key={amenity} className='amenity-item'>
                                            <FontAwesomeIcon icon={amenityIcons[amenity]} className='amenity-icon' />
                                            <span>{amenityLabels[amenity] || amenity}</span>
                                            <span className='amenity-count'>x{count}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className='desc-card'>
                            <h4>Hotel Information</h4>
                            <hr />
                            <div className='hotel-info-grid'>
                                <div className='info-item'>
                                    <FontAwesomeIcon icon={faClock} className='info-icon' />
                                    <span>Check-in: 3:00 pm</span>
                                </div>
                                <div className='info-item'>
                                    <FontAwesomeIcon icon={faClock} className='info-icon' />
                                    <span>Check-out: 10:00 am</span>
                                </div>
                                <div className='info-item'>
                                    <FontAwesomeIcon icon={faCircleExclamation} className='info-icon' />
                                    <span>Min. age to check in: 18</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: booking panel */}
                    <div className='booking-panel'>
                        <div className='booking-card'>
                            <div className='booking-card-header'>
                                <h3>Reserve This Room</h3>
                                <p>Select your dates and complete your booking</p>
                            </div>

                            <div className='booking-card-body'>
                                {/* Date toggle */}
                                <div
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    style={{ cursor: 'pointer' }}
                                    role="button"
                                    aria-expanded={showCalendar}
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && setShowCalendar(!showCalendar)}
                                >
                                    <div className={`date-toggle ${showCalendar ? 'open' : ''}`}>
                                        <span className='date-toggle-left'>
                                            <FontAwesomeIcon icon={faCalendarDays} />
                                            <span>Select Dates</span>
                                        </span>
                                        <FontAwesomeIcon icon={faChevronDown} className='date-toggle-chevron' />
                                    </div>
                                </div>

                                {showCalendar && (
                                    <div className='mb-3'>
                                        <DateRange
                                            editableDateInputs={true}
                                            onChange={handleSelect}
                                            moveRangeOnFirstSelection={false}
                                            ranges={selection}
                                            locale={enUS}
                                            minDate={new Date()}
                                        />
                                    </div>
                                )}

                                {/* Date display */}
                                <div className='date-display'>
                                    <div className='date-field'>
                                        <label>Arrival</label>
                                        <span>{format(selection[0].startDate, 'MMM dd, yyyy')}</span>
                                    </div>
                                    <div className='date-field'>
                                        <label>Departure</label>
                                        <span>{format(selection[0].endDate, 'MMM dd, yyyy')}</span>
                                    </div>
                                </div>

                                {/* Form fields */}
                                <div className='form-field'>
                                    <label>Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                    />
                                </div>

                                <div className='form-field'>
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='form-field'>
                                    <label>Guests</label>
                                    <select
                                        value={guests}
                                        onChange={(e) => setGuests(Number(e.target.value))}
                                    >
                                        <option value={1}>1 Guest</option>
                                        <option value={2}>2 Guests</option>
                                    </select>
                                </div>

                                <div className='pricing-row'>
                                    <span>ZAR {room.price.toLocaleString('en-ZA')} / night</span>
                                    <strong>{effectiveNumberOfDays} {effectiveNumberOfDays === 1 ? 'night' : 'nights'}</strong>
                                </div>
                            </div>

                            <div className='booking-card-footer'>
                                <div className='total-line'>
                                    <span>Total</span>
                                    <strong>ZAR {(room.price * effectiveNumberOfDays).toLocaleString('en-ZA')}</strong>
                                </div>
                                {loading ? (
                                    <div className="spinner-container">
                                        <div className="spinner"></div>
                                        <p>Processing your booking...</p>
                                    </div>
                                ) : (
                                    <button onClick={handleBooking} className="btn-book">Book Now</button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Booking;