var ref = firebase.database().ref("/Members/")



function smartSociety(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/getMembers"+"?societyID=1", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(typeof xhttp.responseText);

            const memberList = JSON.parse(xhttp.responseText).member;

            console.log(memberList)
        
            var count = 0;
            for(var i in memberList){
                count += 1;

                tr = document.createElement('tr');
                th = document.createElement('th');
                td1 = document.createElement('td');
                td2 = document.createElement('td');
                td3 = document.createElement('td');
                td4 = document.createElement('td');
                td5 = document.createElement('td'); 

                var name = document.createTextNode(memberList[i].name);
                var email = document.createTextNode(memberList[i].email);
                var contact = document.createTextNode(memberList[i].contact);
                var flatno = document.createTextNode(memberList[i].flatno);
                var type = document.createTextNode(memberList[i].type);
                var countNode = document.createTextNode(count.toString())

                th.appendChild(countNode);
                td1.appendChild(name);
                td2.appendChild(email);
                td3.appendChild(contact);
                td4.appendChild(flatno);
                td5.appendChild(type);

                tr.appendChild(th);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);

                document.getElementById('disp').appendChild(tr);


            }
        }
    };
}



window.onload = function(){
    window.smartSociety = new smartSociety();
};
