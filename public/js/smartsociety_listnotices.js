var ref = firebase.database().ref("/Members/")



function smartSociety() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/getNotices" + "?societyID=1&mode=saved", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(xhttp.responseText);

            const noticesIdList = JSON.parse(xhttp.responseText).noticeID;
            const noticesList = JSON.parse(xhttp.responseText).notices;
            console.log(noticesIdList);
            console.log(noticesList)

            var count = 0;
            for (var i in noticesIdList) {
                count += 1;
                var id = (count - 1).toString();
                tr = document.createElement('tr');
                td1 = document.createElement('td');
                td2 = document.createElement('td');
                td3 = document.createElement('td');
                td4 = document.createElement('td');
                td5 = document.createElement('td');

                td1.setAttribute('id', 'subject');
                td2.setAttribute('id', 'owner');
                td3.setAttribute('id', 'tenant');

                var subject = document.createTextNode(noticesList[i].subject);
                var ownerrecipients = document.createTextNode(noticesList[i].owner);
                var tenantrecipients = document.createTextNode(noticesList[i].tenant);
                var countNode = document.createTextNode(count.toString());

                td1.setAttribute('value', subject);
                td2.setAttribute('value', ownerrecipients);
                td1.setAttribute('value', tenantrecipients);

                editButton = document.createElement("button");
                editButton.setAttribute('class', 'btn btn-success');
                editButton.innerHTML = "Preview / Edit";
                editButton.setAttribute('id', id);
                editButton.setAttribute('onClick', "editNotice(this.id)");
                /*editButton.addEventListener('click', function(){
                    editNotice(noticesIdList, noticesList, editButton.getAttribute('id'));
                });*/

                publishButton = document.createElement("button");
                publishButton.setAttribute('class', 'btn btn-success');
                publishButton.innerHTML = "Publish";
                publishButton.setAttribute('id', id);
                publishButton.setAttribute('onClick', "publishNotice(this.id)");

                //th.appendChild(countNode);
                td1.appendChild(subject);
                td2.appendChild(ownerrecipients);
                td3.appendChild(tenantrecipients);
                td4.appendChild(editButton);
                td5.appendChild(publishButton);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.setAttribute('id', id);

                document.getElementById('disp').appendChild(tr);


            }
        }
    };
}

function editNotice(id) {
    var currentUrl = window.location.href;
    console.log(currentUrl);
    var url = currentUrl.replace(/\/[^\/]*$/, "/smartsociety_editnotice.html");
    url = url + "?" + id;
    window.location.assign(url);
}

function publishNotice(id) {

    var reply = window.confirm("Are you sure you want to publish this notice? Notices once published cannot be unpublished");
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
    if (reply) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/publishNotice" + "?societyID=1&noticeID=" + id + "&datetime=" + timestamp, true);
        xhttp.send();
        console.log("here");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhttp.responseText);
                if (xhttp.responseText == "success") {
                    window.alert("Notice Published Successfully");
                }
                //return true;
            }
        };
    }
}

window.onload = function () {
    window.smartSociety = new smartSociety();
};
