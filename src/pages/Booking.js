import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
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

    const [showCalendar, setShowCalendar] = useState(false);
    const [selection, setSelection] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleSelect = (ranges) => {
        setSelection([ranges.selection]);
    };

    const amenityIcons = {
        "Coffee Maker": faMugSaucer,
        "Bath Robes": faShirt,
        "Bath Towels": faBath,
        "Breakfast": faUtensils,
        "wifi": faWifi,
        "Parking": faCar,
        "Gym Access": faDumbbell,
        "Air Conditioner": faSnowflake
    };

    if (!room) return <>
        <p>No room data provided.</p>
    </>;

    return (
        <>
            <h1>Bookings</h1>
            <div className='roomDetails card p-2'>

                {/* Rooms */}
                <div className="roomImages">
                    <img className='roomImg1' src={room.roomImages[0]} alt={room.roomName} />
                    <img className='roomImg2' src={room.roomImages[1]} alt={room.roomName} />
                    <img className='roomImg3' src={room.roomImages[2]} alt={room.roomName} />
                </div>

                {/* Rooms, descriptions, amenities and details */}
                {/* Rooms, descriptions and amenities */}
                <div>
                    {/* Room and description */}
                    <div>
                        <h1>{room.roomName}</h1>
                        <p>{room.roomDetails}</p>
                        <p>Price: R{room.roomPrice}</p>
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

                    {/* Booking Section */}
                    <div className='card'>
                        <h6 className='display-6'>Details</h6>
                        <hr />
                        {/* Book Dates */}
                        <div>
                            <div onClick={() => setShowCalendar(!showCalendar)} style={{ cursor: 'pointer' }}>
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
                                <p><strong>Start:</strong> {format(selection[0].startDate, 'MMM dd, yyyy')}</p>
                                <p><strong>End:</strong> {format(selection[0].endDate, 'MMM dd, yyyy')}</p>
                            </div>
                        </div>
                        {/* Reserve date */}
                        <div className='card'>
                            <div>
                                <p>Pricing</p>
                                <p>R{room.roomPrice}/night</p>
                            </div>
                            <button className='btn btn-dark'>Pricing</button>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

export default Booking;

// Insipiration: https://dribbble.com/shots/25716741-Serenity-Hotel-Booking-Details-Page