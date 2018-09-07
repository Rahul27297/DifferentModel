var ref = firebase.database().ref("/facilities/");

window.onload = function(){
    window.smartSociety = new smartSociety();
}

function smartSociety(){
    var searchFacilityBtn = document.getElementById("searchfacility_btn");
    searchFacilityBtn.addEventListener('click',this.searchFacility.bind(this));
    
    var updateFacilityBtn = document.getElementById("updatefacility_btn");
    updateFacilityBtn.addEventListener('click',this.updateFacility.bind(this));

    var deleteFacilitybtn = document.getElementById("deletefacility_btn");
    deleteFacilitybtn.addEventListener('click',this.deleteFacility.bind(this));

    var displayFacilityBlock = document.getElementById("iffacilityexists");
    displayFacilityBlock.style.display = "none";
    var ifbookingrequired = document.getElementById("ifbookingrequired");
    ifbookingrequired.style.display = "none";
    var bookingRequirement = document.getElementById("booking_requirement");
    bookingRequirement.addEventListener('change',this.selectChanged.bind(this));
}

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

smartSociety.prototype.searchFacility = function(){
    var facilityNameSearch = document.getElementById("facility_name_search").value;
    //window.alert(facilityName);
    //making an xml http request
    var displayFacilityBlock = document.getElementById("iffacilityexists");
    displayFacilityBlock.style.display = "none";
    var ifbookingrequired = document.getElementById("ifbookingrequired");
    ifbookingrequired.style.display = "none";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //display result
            //window.alert(xhttp.responseText);
            const facilityInfo = JSON.parse(xhttp.responseText);
            displayFacilityBlock.style.display = "block";
            var facilityName = document.getElementById("facility_name");
            var openingHours = document.getElementById("opening_hours");
            var closingHours = document.getElementById("closing_hours");
            var bookingRequirement = document.getElementById("booking_requirement");
            var useStatus = document.getElementById("use_status");
            var slotDuration = document.getElementById("slot_duration");
            var slotBreak = document.getElementById("slot_break");
            facilityName.value = facilityNameSearch;
            openingHours.value = facilityInfo.opening_hours;
            closingHours.value = facilityInfo.closing_hours;
            slotDuration.value = facilityInfo.session_time;
            slotBreak.value = facilityInfo.break_time_per_slot;

            if(facilityInfo.isbookable == "true"){
                bookingRequirement.selectedIndex = 0;
            }
            else{
                bookingRequirement.selectedIndex = 1;
            }

            if(facilityInfo.current_status == "Usable"){
                useStatus.selectedIndex = 0;
            }
            else{
                useStatus.selectedIndex = 1;
            }

            if(bookingRequirement.selectedIndex == 0){
                ifbookingrequired.style.display = "block";
            }
        }
    };
    xhttp.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchFacility?societyid=1&facilityname="+facilityNameSearch,true);
    xhttp.send();
};

smartSociety.prototype.updateFacility = function(){
    var facilityName = document.getElementById("facility_name").value;
    var openingHours = document.getElementById("opening_hours").value;
    var closingHours = document.getElementById("closing_hours").value;
    var bookingRequirement = document.getElementById("booking_requirement");
    var useStatus = document.getElementById("use_status");
    var slotDuration = document.getElementById("slot_duration").value;
    var slotBreak = document.getElementById("slot_break").value;

    if(bookingRequirement.selectedIndex == 1){
        bookingRequirement = "false";
        slotDuration = "NA";
        slotBreak = "NA";
    }
    else{
        bookingRequirement = "true";
    }

    if(useStatus.selectedIndex == 0){
        useStatus = "Usable";
    }
    else{
        useStatus = "Under Maintainence";
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //success
            window.alert(xhttp.responseText);
        }
    }
    xhttp.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/updateFacility?societyid=1&facilityname=" + facilityName + "&bafu=true&btps=" + slotBreak + "&ch=" + closingHours +"&cs="+useStatus+"&bookable="+bookingRequirement+"&oh="+openingHours+"&st="+slotDuration+"&abf=7",true);
    xhttp.send();
};

smartSociety.prototype.deleteFacility = function(){

    var xhttp = new XMLHttpRequest();
    var facilityName = document.getElementById("facility_name").value;
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //deletion successful
            window.alert(xhttp.responseText);
        }
    }
    xhttp.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/deleteFacility?societyid=1&facilityname=" + facilityName,true);
    xhttp.send();

}