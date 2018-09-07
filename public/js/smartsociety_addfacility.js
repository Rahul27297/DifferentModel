var ref = firebase.database().ref("/facilities/");

window.onload = function(){
    window.smartSociety = new smartSociety();
}

function smartSociety(){
    var addFaciilityBtn = document.getElementById("addfacility_btn");
    addFaciilityBtn.addEventListener('click',this.addFacility.bind(this));

    var ifBookingRequired = document.getElementById("ifbookingrequired");
    ifBookingRequired.style.display = "none";
    var bookingRequirement = document.getElementById("booking_requirement");
    bookingRequirement.addEventListener('change',this.selectChanged.bind(this));
};

smartSociety.prototype.selectChanged = function(){
    var bookingRequirement = document.getElementById("booking_requirement");
    var ifBookingRequired = document.getElementById("ifbookingrequired");
    if(bookingRequirement.selectedIndex == 0){
        ifBookingRequired.style.display = "block";
    }
    if(bookingRequirement.selectedIndex == 1){
        ifBookingRequired.style.display = "none";
    }
};

smartSociety.prototype.addFacility = function(){
    var facilityName = document.getElementById("facility_name").value;
    var openingHours = document.getElementById("opening_hours").value;
    var closingHours = document.getElementById("closing_hours").value;
    var bookingRequirement = document.getElementById("booking_requirement");
    var useStatus = document.getElementById("use_status");
    var slotDuration = document.getElementById("slot_duration").value;
    var slotBreak = document.getElementById("slot_break").value;

    if(facilityName == "" || openingHours == "" || closingHours == "" || bookingRequirement.selectedIndex == 2 || useStatus.selectedIndex == 2){
        window.alert("Please fill all fields");
    }

    if(bookingRequirement.selectedIndex == 0){
        bookingRequirement = "true";
        if(slotDuration == "" || slotBreak == ""){
            window.alert("Please fill all fields");
        }
    }
    else if(bookingRequirement.selectIndex == 1){
        bookingRequirement = "false";
        slotDuration = NA;
        slotBreak = NA;
    }

    if(useStatus.selectedIndex == 0){
        useStatus == "Usable";
    }
    else{
        useStatus = "Under Maintainence"
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            window.alert(xhttp.responseText);
        }
    }
    xhttp.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createFacility?societyid=1&facilityname=" + facilityName + "&bafu=true&btps=" + slotBreak + "&ch=" + closingHours +"&cs="+useStatus+"&bookable="+bookingRequirement+"&oh="+openingHours+"&st="+slotDuration+"&abf=7",true);
    xhttp.send();
};