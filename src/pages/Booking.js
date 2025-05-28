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
    const navigate = useNavigate();

    const [images, setImages] = useState(room.images);

    const handleImageClick = (index) => {
        if (index === 0) return; // already in position 1

        const newImages = [...images];
        const [selectedImage] = newImages.splice(index, 1); // remove clicked image
        newImages.unshift(selectedImage); // add it to the front
        setImages(newImages);
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
            <h1>Bookings</h1>
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
                                            <span> {amenity}</span>
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
                                <p><FontAwesomeIcon icon={faClock} /> Check Out : 12:00 pm</p>
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
                                <p><FontAwesomeIcon icon={faCalendarDays} />Dates</p>
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
                        <input type="text" placeholder="Your Name" className="form-control mb-2" />
                        <input type="email" placeholder="Email Address" className="form-control mb-2" />
                        <select className="form-control mb-2">
                            <option value={1}>1 Guest</option>
                            <option value={2}>2 Guests</option>
                        </select>
                        <button className='btn btn-dark mt-2'>Book</button>
                        {/* Prices calculated by days * roomPrice */}
                        <p>Total for {effectiveNumberOfDays} day stay: R{(room.price * effectiveNumberOfDays).toLocaleString('en-ZA')}</p>

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