import { useNavigate } from 'react-router-dom';
import '../assets/styles/Rooms.css';

function Rooms() {
    const navigate = useNavigate();

    const roomsArray = [
        {
            id: 1,
            name: "Presidential Suite",
            price: 5500,
            images: [
                "https://drsprnoe9nnhf.cloudfront.net/southernsun-04222022/cms/cache/v2/576be0af22ad4.jpg/1920x1080/resize/80/791c44a2aabe72e0c68f7b1b6239ea3b.jpg",
                "https://drsprnoe9nnhf.cloudfront.net/southernsun-04222022/cms/cache/v2/576be09966d33.jpg/1920x1080/resize/80/40c64445e22c62672854640faa2ddca6.jpg",
                "https://drsprnoe9nnhf.cloudfront.net/southernsun-04222022/cms/cache/v2/5d2f0a754de8f.jpg/1920x1080/resize/80/65a6c3c3c1d2f761f42ba5a24a502f66.jpg",
            ],
            description:
                "Experience ultimate luxury in our Presidential Suite. With a grand bedroom, elegant lounge area, private dining space, and top-tier finishes, it’s perfect for guests seeking premium comfort and sophistication. Enjoy exclusive services, panoramic views, and a tranquil environment that redefines five-star hospitality.",
            amenities: {
                coffeeMaker: 1,
                bathRobes: 4,
                bathTowels: 4,
                breakfast: 2,
                wifi: 2,
                parking: 2,
                gymAccess: 1,
                airConditioner: 6,
            },
        },
        {
            id: 2,
            name: "Single Room",
            price: 2000,
            images: [
                "https://images.pexels.com/photos/29252630/pexels-photo-29252630/free-photo-of-cozy-minimalist-bedroom-with-modern-decor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/29252626/pexels-photo-29252626/free-photo-of-modern-minimalist-living-room-interior-with-stylish-sofa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/29252628/pexels-photo-29252628/free-photo-of-modern-bathroom-interior-with-shower-and-washing-machine.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            ],
            description:
                "Perfect for solo travelers, our Single Room offers a cozy space with a comfortable bed, workspace, and modern amenities. Ideal for both business and leisure, this room ensures privacy and peace in a warm, elegant setting. Enjoy comfort and convenience at an affordable rate.",
            amenities: {
                coffeeMaker: 0,
                bathRobes: 1,
                bathTowels: 1,
                breakfast: 0,
                wifi: 1,
                parking: 1,
                gymAccess: 0,
                airConditioner: 2,
            },
        },
        {
            id: 3,
            name: "Double Room",
            price: 3500,
            images: [
                "https://images.pexels.com/photos/8142976/pexels-photo-8142976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "https://images.pexels.com/photos/8142972/pexels-photo-8142972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "https://images.pexels.com/photos/8142977/pexels-photo-8142977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            ],
            description:
                "Designed for two, our Double Room provides spacious comfort with a queen bed. Whether you’re traveling with a friend or partner, this room offers a relaxing stay with modern décor, ample storage, and all essential amenities to make your stay enjoyable.",
            amenities: {
                coffeeMaker: 1,
                bathRobes: 2,
                bathTowels: 2,
                breakfast: 1,
                wifi: 2,
                parking: 2,
                gymAccess: 1,
                airConditioner: 4,
            },
        },
    ];

    const handleViewRoom = (room) => {
        navigate('/booking', { state: room });
    };

    return (
        <>
            <div className="roomTitle">
                <h1>Explore Our Offers</h1>
                <p>At Mike's hotel we pride ourselves by having the best rooms for you and your loved ones. Whether you here for business or pleasure we have you covered, so browse over our offerings below and come visit us when you are ready, we'll be waiting for you!</p>
            </div>
            {/* Rooms */}
            <div className='roomView'>
                <h1 className='h1'>Book Your Room Today</h1>
                <div className='rooms'>
                    {roomsArray.map((room, index) => (
                        <div key={index} className='roomCard rounded card p-1'>
                            <img
                                src={room.images[0]}
                                alt={room.name}
                                className='img-fluid rounded'
                            />
                            <p>{room.name}</p>
                            <button
                                onClick={() => handleViewRoom(room)}
                                className='btn btn-secondary rounded-5'
                                aria-label={`View details for ${room.name}`}
                            >
                                View Room
                            </button>
                        </div>
                    ))}
                </div>




            </div>
        </>
    )
}

export default Rooms;

// Insipiration: https://dribbble.com/shots/25716741-Serenity-Hotel-Booking-Details-Page