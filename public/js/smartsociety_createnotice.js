var storageref = firebase.storage();

var smartSociety = function () {
    var saveNoticeBtn = document.getElementById("saveNoticeBtn");
    var publishNoticeBtn = document.getElementById("publishNoticeBtn");
    saveNoticeBtn.addEventListener('click', this.saveNotice.bind(this));
    publishNoticeBtn.addEventListener('click', this.publishNotice.bind(this));
    console.log("hrllo");
}


smartSociety.prototype.saveNotice = function () {
    var noticeSubject = document.getElementById("noticeSubject");
    var noticeFile = document.getElementById("noticeFile");
    var noticeSubjectValue = noticeSubject.value;
    var noticeFileValue = noticeFile.value;
    var noticeTenants = document.getElementById("Tenants");
    var noticeOwner = document.getElementById("Owners")
    var noticeOwnerValue = "false";
    var noticeTenantValue = "false";
    var noticeId = "";
    var xhttp = new XMLHttpRequest();
    //TODO : writing a separate subroutine for calculating timestamp
    //TODO : Implement Callback for firebase fileupload for failure case 

    if (noticeSubjectValue == "") {
        window.alert("Please Enter Subject");
        noticeSubject.focus();
        return false;
    }

    if (noticeFileValue == "") {
        window.alert("Please Upload a notice file");
        noticeSubject.focus();
        return false;
    }

    if (noticeOwner.checked == false && noticeTenants.checked == false) {
        window.alert("Please select read recipients");
        noticeSubject.focus();
        return false;
    }

    if (noticeOwner.checked == true) {
        noticeOwnerValue = noticeOwner.value;
    }

    if (noticeTenants.checked == true) {
        noticeTenantValue = noticeTenants.value;
    }

    xhttp.open("GET", "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/getNoticeID" + "?societyID=1", true);
    xhttp.send();
    console.log("here");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            noticeId = xhttp.responseText;
            console.log(noticeId);
            var noticespath = "/notices/" + ((parseInt(noticeId) + 1).toString());
            if (noticeFileValue != "") {
                var noticeStorageRef = storageref.ref(noticespath);
                console.log(noticespath);
                var $ = jQuery;
                var file_data = $('#noticeFile').prop('files')[0];
                noticeStorageRef.put(file_data);
            }//TODO change the noticeid cloud function to remove +1 used above
            //return true;
        }
    };
    var xhttp1 = new XMLHttpRequest();
    xhttp1.open("GET", "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createNotice" + "?societyID=1" + "&subject=" + noticeSubjectValue + "&tenant=" + noticeTenantValue + "&owner=" + noticeOwnerValue + "&isPublished=false&datetime=NA", true);
    xhttp1.send();
    console.log("here");
    xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp1.responseText);
            if(xhttp1.responseText == "success"){
                window.alert("Notice Saved Successfully");
            }
        }
    };
}

smartSociety.prototype.publishNotice = function () {
    var noticeSubject = document.getElementById("noticeSubject");
    var noticeFile = document.getElementById("noticeFile");
    var noticeSubjectValue = noticeSubject.value;
    var noticeFileValue = noticeFile.value;
    var noticeTenants = document.getElementById("Tenants");
    var noticeOwner = document.getElementById("Owners")
    var noticeOwnerValue = "false";
    var noticeTenantValue = "false";
    var noticeId = "";
    var xhttp = new XMLHttpRequest();
    //TODO : writing a separate subroutine for calculating timestamp
    //TODO : Implement Callback for firebase fileupload for failure case 

    if (noticeSubjectValue == "") {
        window.alert("Please Enter Subject");
        noticeSubject.focus();
        return false;
    }

    if (noticeFileValue == "") {
        window.alert("Please Upload a notice file");
        noticeSubject.focus();
        return false;
    }

    if (noticeOwner.checked == false && noticeTenants.checked == false) {
        window.alert("Please select read recipients");
        noticeSubject.focus();
        return false;
    }

    if (noticeOwner.checked == true) {
        noticeOwnerValue = noticeOwner.value;
    }

    if (noticeTenants.checked == true) {
        noticeTenantValue = noticeTenants.value;
    }

    xhttp.open("GET", "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/getNoticeID" + "?societyID=1", true);
    xhttp.send();
    console.log("here");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            noticeId = xhttp.responseText;
            console.log(noticeId);
            noticeId = ((parseInt(noticeId) + 1).toString());
            var noticespath = "/notices/" + noticeId;
            if (noticeFileValue != "") {
                var noticeStorageRef = storageref.ref(noticespath);
                console.log(noticespath);
                var $ = jQuery;
                var file_data = $('#noticeFile').prop('files')[0];
                noticeStorageRef.put(file_data);
            }//TODO change the noticeid cloud function to remove +1 used above
            //return true;
        }
    };

    var date = new Date();
    //YYYYMMDDHHMMSS is the stamp used. If month is not NOV/DEC, 0 isnt prepend to the month number
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (month < 10) { month = "0" + month.toString(); }
    if (day < 10) { day = "0" + day.toString(); }
    if (hour < 10) { hour = "0" + hour.toString(); }
    if (minute < 10) { minute = "0" + minute.toString(); }
    if (second < 10) { second = "0" + second.toString(); }

    var timestamp = (year + month + day + hour + minute + second).toString();
    console.log(timestamp);

    var xhttp1 = new XMLHttpRequest();
    xhttp1.open("GET", "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createNotice" + "?societyID=1&subject=" + noticeSubjectValue + "&tenant=" + noticeTenantValue + "&owner=" + noticeOwnerValue + "&isPublished=true&datetime=" + timestamp, true);
    xhttp1.send();
    console.log("here");
    xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp1.responseText);
            if(xhttp1.responseText == "success"){
                window.alert("Notice Published Successfully");
            }
            //return true;
        }
    };

            
            //TODO change the noticeid cloud function to remove +1 used above
            //return true;
}
    


window.onload = function () {
    window.smartSociety = new smartSociety();
};
