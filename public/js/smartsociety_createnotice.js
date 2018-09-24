var storageref = firebase.storage();

function smartSociety(){
    var saveNoticeBtn = document.getElementById("saveNoticeBtn");
    saveNoticeBtn.addEventListener('click',this.saveNotice.bind(this));
    console.log("hrllo");
}


smartSociety.prototype.saveNotice = function(){
    var noticeSubject = document.getElementById("noticeSubject");
    //var noticeContent = document.getElementById("noticeContent");
    var noticeFile = document.getElementById("noticeFile");
    var noticeSubjectValue = noticeSubject.value;
    //var noticeContentValue = noticeContent.value;
    var noticeFileValue = noticeFile.value;
    var noticeTenants = document.getElementById("Tenants");
    var noticeOwners = document.getElementById("Owners")
    var noticeOwnerValue = "false";
    var noticeTenantValue = "false";
    //TODO : writing a separate subroutine for calculating timestamp
    //TODO : Implement Callback for firebase fileupload for failure case 
    
    if(noticeSubjectValue == ""){
        window.alert("Please Enter Subject");
        noticeSubject.focus();
        return false;
    }

    if(noticeFileValue == ""){
        window.alert("Please Upload a notice file");
        noticeSubject.focus();
        return false;
    }

    if(noticeOwners.checked == false && noticeTenants.checked == false ){
        window.alert("Please select read recipients");
        noticeSubject.focus();
        return false;        
    }

    if(noticeOwners.checked == true){
        noticeOwnersValue = noticeOwners.value;
    }

    if(noticeTenants.checked == true){
        noticeTenantValue = noticeTenants.value;
    }

    if(noticeFileValue != ""){
        var date = new Date();
        //YYYYMMDDHHMMSS is the stamp used. If month is not NOV/DEC, 0 isnt prepend to the month number
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        
        if(month < 10){month = "0" + month.toString();}
        if(day < 10){day = "0" + day.toString();}
        if(hour < 10){hour = "0" + hour.toString();}
        if(minute < 10){minute = "0" + minute.toString();}
        if(second < 10){second = "0" + second.toString();}

        var timestamp = year+month+day+hour+minute+second;
        console.log(timestamp);
        var noticeStorageRef = storageref.ref(timestamp);
        var $ = jQuery;
        var file_data = $('#noticeFile').prop('files')[0];
        noticeStorageRef.put(file_data);
    }
    /*if(noticeContentValue == ""){
        window.alert("Please Enter Content for Notice");
        noticeContent.focus();
        return false;
    }*/

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createNotice"+"?societyID=1"+"&subject="+noticeSubjectValue+"&datetime="+timestamp+"&tenant="+noticeTenantValue+"&owner="+noticeOwnerValue,true);
    xhttp.send();
    console.log("here");
    xhttp.onreadystatechange = function(){
        if ( this.readyState == 4 && this.status == 200){
            console.log(xhttp.responseText);

           /* const memberInfo = JSON.parse(xhttp.responseText).member;
            if(memberInfo!=null){
                window.alert("Member with given email ID already exists. Select a different email ID");
    
            }
            else{
                console.log("in addition")

                // adding member using create member cloud function
                var xhttp2 = new XMLHttpRequest();
                console.log("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email);
                xhttp2.open("POST","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email,true);
                xhttp2.send();
                xhttp2.onreadystatechange = function(){
                    if ( this.readyState == 4 && this.status == 200){
                        window.alert("Member Successfully Added")
                    }
                }
            }*/
           

        }
    }
    
}


window.onload = function(){
    window.smartSociety = new smartSociety();
};
