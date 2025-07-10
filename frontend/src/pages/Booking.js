import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format, differenceInDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-date-range/dist/styles.css'; // main css
import 'react-date-range/dist/theme/default.css'; // theme css
import { useLocation, useNavigate } from 'react-router-dom';
import { faMugSaucer, faChevronDown, faShirt, faBath, faUtensils, faWifi, faCar, faDumbbell, faSnowflake, faClock, faCircleExclamation, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/styles/Booking.css';

function Booking() {
    const location = useLocation();
    const room = location.state;

    const [images, setImages] = useState(room.images);
    const [guestName, setGuestName] = useState('');
    const [email, setEmail] = useState('');
    const [guests, setGuests] = useState(1);
    const [success, setSuccess] = useState(false); // for showing confirmation
    const [loading, setLoading] = useState(false);

    const handleImageClick = (index) => {
        if (index === 0) return; // already in position 1

        const newImages = [...images];
        // Swap positions between clicked image and first image
        [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
        setImages(newImages);
    };

    const handleBooking = async () => {
        if (!guestName || !email) {
            alert("Please enter your name and email.");
            return;
        }

        //Room type map to make it easier to send room payload to database
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

        const bookingDetails = {
            room: room.name,
            name: guestName,
            email,
            guests,
            startDate: selection[0].startDate,
            endDate: selection[0].endDate,
            totalPrice: room.price * effectiveNumberOfDays,
        };


        try {
            setLoading(true);

            const res = await fetch('https://mikes-hotel-revised.onrender.com/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                console.log("API Error Response:", data);
                throw new Error(data.message || "Booking failed");
            }

            // Success
            setSuccess(true);
            alert("Booking successful!");


            // Reset form inputs
            setGuestName('');
            setEmail('');
            setGuests(1);

            //hide the calendar
            setShowCalendar(false);

            // Reset calendar selection to today
            setSelection([
                {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection'
                }
            ]);
        } catch (err) {
            console.error('Booking error:', err);
            alert(err.message || 'Something went wrong. Please try again.');
        }
        finally{
            setLoading(false);
        }
        // Optional: navigate to a confirmation page
        // navigate("/confirmation", { state: bookingDetails });
    };


    const [showCalendar, setShowCalendar] = useState(false);
    const [selection, setSelection] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    if (!room) return <>
        <p>No room data provided.</p>
    </>;

    // Calculate the number of days
    const numberOfDays = differenceInDays(selection[0].endDate, selection[0].startDate);

    // Ensure at least 1 day if start and end dates are the same (for single-night stays)
    const effectiveNumberOfDays = numberOfDays === 0 ? 1 : numberOfDays;

    const handleSelect = (ranges) => {
        setSelection([ranges.selection]);
    };

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
            <div className="bookingTitle">
                <h1>Book your Stay</h1>
                <p>You have chosen to stay in the {room.name}. View the room offerings and amenities and book your stay.</p>
            </div>
            <h1 className='main_heading'>Bookings</h1>
            <div className='roomDetails card p-2'>

                {/* Rooms */}
                <div className="roomImages">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={room.name}
                            className={`roomImg${idx + 1}`}
                            onClick={() => handleImageClick(idx)}
                            // onError={(e) => e.target.src = '/fallback.jpg'} TODO, add a fallback image
                            style={{ cursor: 'pointer' }}
                            loading="lazy"
                        />
                    ))}
                </div>

                {/* Rooms, descriptions, amenities and details */}
                <div className='room_desc_amenities_bookings'>
                    {/* Rooms, descriptions and amenities */}
                    <div className='room_desc'>
                        {/* Room and description */}
                        <div>
                            <h1>{room.name}</h1>
                            <p>{room.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className='card my-3'>
                            <h4 className='card-title pt-3 display-6'>Amenities</h4>
                            <hr />
                            <ul className="list-none pl-0 space-y-2 amenity_list">
                                {Object.entries(room.amenities)
                                    .filter(([_, count]) => count > 0)
                                    .map(([amenity, count]) => (
                                        <li key={amenity} className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={amenityIcons[amenity]} className="text-blue-600" />
                                            <span> {amenityLabels[amenity] || amenity}</span>
                                            <span className="text-sm text-gray-600 font-semibold">: {count}</span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        {/* Hotel information */}
                        <div className="card my-3">
                            <h4 className='card-title pt-3 display-6'>Hotel Information</h4>
                            <hr />
                            <div className='d-flex flex-row justify-content-center gap-4 flex-wrap text-center'>
                                <p><FontAwesomeIcon icon={faClock} /> Check In : 3:00 pm</p>
                                <p><FontAwesomeIcon icon={faClock} /> Check Out : 10:00 am</p>
                                <p><FontAwesomeIcon icon={faCircleExclamation} /> Minimum Age to Check In : 18</p>
                            </div>


                        </div>
                    </div>
                    {/* End of Rooms, descriptions and amenities */}

                    {/*  Start of Booking Section */}
                    <div className='card p-1 booking_section'>
                        <h6 className='display-6'>Details</h6>
                        <hr />
                        {/* Book Dates */}
                        <div>
                            <div onClick={() => setShowCalendar(!showCalendar)} style={{ cursor: 'pointer' }} role="button" aria-expanded={showCalendar} tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setShowCalendar(!showCalendar)}>
                                <p><FontAwesomeIcon icon={faCalendarDays} /> Dates</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>

                            {showCalendar && (
                                <div className='mb-3'>
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={handleSelect}
                                        moveRangeOnFirstSelection={false}
                                        ranges={selection}
                                        locale={enUS}
                                        minDate={new Date()} //This prevents past dates from being selected
                                    />
                                </div>
                            )}

                            <div className='text-muted'>
                                <p><strong>Arrival:</strong> {format(selection[0].startDate, 'MMM dd, yyyy')}</p>
                                <p><strong>Departure:</strong> {format(selection[0].endDate, 'MMM dd, yyyy')}</p>
                            </div>
                        </div>
                        {/* Reserve date */}
                        <hr />
                        <div>
                            <p>Pricing</p>
                            <p>R{room.price}/night</p>
                        </div>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="form-control mb-2"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="form-control mb-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <select
                            className="form-control mb-2"
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                        >
                            <option value={1}>1 Guest</option>
                            <option value={2}>2 Guests</option>
                        </select>
                        {loading ? (
                            <div className="spinner-container">
                                <div className="spinner"></div>
                                <p>Processing your booking...</p>
                            </div>
                            ) : (
                            <button onClick={handleBooking} className="booking-btn btn btn-dark mt-2">Book Now</button>
                            )}
                        {/* Prices calculated by days * roomPrice */}
                        <p>Total for {effectiveNumberOfDays} night stay: R{(room.price * effectiveNumberOfDays).toLocaleString('en-ZA')}</p>

                        {/* End of Reserve date */}

                    </div>

                    {/*  End of Booking Section */}
                </div>

                {/* End of Rooms, descriptions, amenities and details */}

            </div>
        </>
    );
}

export default Booking;

// Insipiration: https://dribbble.com/shots/25716741-Serenity-Hotel-Booking-Details-Page