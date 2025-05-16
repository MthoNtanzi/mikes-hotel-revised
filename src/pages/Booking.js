function Booking() {
    const roomsJson = {
        "rooms": {
            "room1": {
                "roomName": "Presidential Suite",
                "roomPrice": 5500,
                "roomImages": [
                        "",
                        "",
                        "",
                    ]
            },
            "room2":{
                "roomName": "Single Room",
                "roomPrice": 2000,
                "roomImages": [
                        "https://images.pexels.com/photos/8142976/pexels-photo-8142976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/8142972/pexels-photo-8142972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/8142977/pexels-photo-8142977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    ]
            },
            "room3":{
                "roomName": "Double Room",
                "roomPrice": 3500,
                "roomImages": [
                    "",
                    "",
                    ""
                ]
            }
        }
    }

    return(
        <h1>Booking Page</h1>
    )
}

export default Booking;

// Insipiration: https://dribbble.com/shots/25716741-Serenity-Hotel-Booking-Details-Page