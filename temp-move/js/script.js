function range(){
    let rangeSlider = document.getElementById("valueRange").value;
    document.getElementById("valueRangeTxtBx").value =  rangeSlider;

    return rangeSlider;
}

function calculate(){
    let roomPrice;
    let adultsVst = document.getElementById("adultsSelect").value;
    let childVst = document.getElementById("kidsSelect").value;

    var price;
    var pricePerAdult = adultsVst * 50;
    var pricePerChild = childVst * 80;

    var daysVisit = range() * 500;

    // var roomPrice;

    roomValue();
    
    function roomValue(){
        var room = document.getElementById("selectedRoom").value;
        
    
        switch(room){
            case "singleRoom":
                roomPrice = 1500;
                break;
            case "sharingRoom":
                roomPrice = 2000;
                break;
            case "luxSuite":
                roomPrice = 3500;
                break;
            default:
                roomPrice = 1000;
        }
    }
   
    price = pricePerAdult + pricePerChild + daysVisit + roomPrice;
    
    window.alert("You will pay: R" + price +" for your stay");
}