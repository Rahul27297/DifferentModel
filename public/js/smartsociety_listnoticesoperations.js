var storage = firebase.storage();
var storageref = firebase.storage();

var smartSociety = function(){
    var noticeFileBlock = document.getElementById("noticeFileBlock");
    noticeFileBlock.style.visibility = "hidden";
    var url = window.location.href;
    var id = url.substring(url.indexOf('?')+1, url.length);
    console.log(id);
    this.setup(id);
};

smartSociety.prototype.setup = function(id){
    var noticeSubject = document.getElementById("noticeSubject");
    var noticeOwnerRecipients = document.getElementById("Owners");
    var noticeTenantRecipients = document.getElementById("Tenants");
    var noticeFileLink = document.getElementById("noticeFileLink");
    var noticeFile = document.getElementById("noticeFile");
    noticeFile.setAttribute('value','aaa'); 
    var buttondiv = document.getElementById("buttondiv");
    var deleteNoticeFileBtn = document.getElementById("deleteNoticeFileBtn");
    deleteNoticeFileBtn.addEventListener('click',function(event){
        event.preventDefault();
        smartSociety.deleteNoticeFile(id, buttondiv);
    });

    var saveNoticeBtn = document.getElementById("saveNoticeBtn");
    var publishNoticeBtn = document.getElementById("publishNoticeBtn");
    saveNoticeBtn.addEventListener('click', function(){
        smartSociety.saveNotice(id);
    });
    publishNoticeBtn.addEventListener('click', function(){
        smartSociety.publishNotice(id);
    });

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/getNotice?societyID=1&noticeID=" + id, true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            var notice = JSON.parse(xhttp.responseText);
            noticeSubject.value = notice.subject;
            if(notice.owner == "true"){
                noticeOwnerRecipients.checked = true;
            }
            else{
                noticeOwnerRecipients.checked = false;
            }

            if(notice.tenant == "true"){
                noticeTenantRecipients.checked = true;
            }
            else{
                noticeTenantRecipients.checked = false;
            }
            var storageRef = storage.ref("/notices/");
            storageRef.child(id).getDownloadURL().then(function(url){
                var xhttpstorage = new XMLHttpRequest();
                xhttpstorage.open('GET',url,true);
                xhttpstorage.send();
                xhttpstorage.onreadystatechange = function(){
                   if(xhttpstorage.readyState == 4 && xhttpstorage.status == 200){
                       var response = xhttpstorage.responseText;
                       noticeFileLink.setAttribute('href', url);
                   } 
                };
            })
            .catch(function(error){
                console.log(error);
            });
        }
    };
};

window.onload = function(){
    window.smartSociety = new smartSociety();
};

smartSociety.prototype.deleteNoticeFile = function(id,buttondiv){
   var noticeFileBlock = document.getElementById("noticeFileBlock");
   var noticeFile = document.getElementById("noticeFile");
    var reply = window.confirm("Are you sure you want to delete the notice file?. Info: This action is cannot be reversed.");
    if(reply){
        noticeFileBlock.style.visibility = "visible";
        buttondiv.style.visibility = "hidden";
        noticeFile.setAttribute('value','');
    }
}

smartSociety.prototype.saveNotice = function (id) {
    var noticeSubject = document.getElementById("noticeSubject");
    var noticeFile = document.getElementById("noticeFile");
    var noticeSubjectValue = noticeSubject.value;
    var noticeFileValue = noticeFile.value;
    window.alert(noticeFileValue);
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

    var noticespath = "/notices/" + id;
    if (noticeFileValue != "") {
        var noticeStorageRef = storageref.ref(noticespath);
        console.log(noticespath);
        var $ = jQuery;
        var file_data = $('#noticeFile').prop('files')[0];
        noticeStorageRef.put(file_data);
    }//TODO change the noticeid cloud function to remove +1 used above
    //return true;  

    var xhttp1 = new XMLHttpRequest();
    xhttp1.open("GET", "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/updateNotice" + "?societyID=1" + "&subject=" + noticeSubjectValue + "&tenant=" + noticeTenantValue + "&owner=" + noticeOwnerValue + "&isPublished=false&datetime=NA&noticeID=" + id, true);
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

smartSociety.prototype.publishNotice = function (id) {
    var noticeSubject = document.getElementById("noticeSubject");
    var noticeFile = document.getElementById("noticeFile");
    window.alert(noticeFile.value);
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
    xhttp1.open("GET", "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/updateNotice" + "?societyID=1&subject=" + noticeSubjectValue + "&tenant=" + noticeTenantValue + "&owner=" + noticeOwnerValue + "&isPublished=true&datetime=" + timestamp + "&noticeID=" + id, true);
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
    