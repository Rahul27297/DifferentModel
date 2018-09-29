var ref = firebase.database().ref("/Members/")

//console.log(ref)

function smartSociety(){

    var searchBtn = document.getElementById("search");
    searchBtn.addEventListener('click',this.searchMember.bind(this));

    var deleteMemberBtn = document.getElementById("delete");
    deleteMemberBtn.addEventListener('click',this.deleteMember.bind(this));


    var updateMemberBtn = document.getElementById("update");
    updateMemberBtn.addEventListener('click',this.updateMember.bind(this));


    console.log("hrllo");

    // Search result display

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

                // Delete cross

                linkcross = document.createElement('a');
                spanele = document.createElement('span');
                spanattr = document.createAttribute('class');
                spanattr.value = "glyphicon glyphicon-remove";
                spanele.setAttributeNode(spanattr);


                hrefattr = document.createAttribute('href');
                hrefattr.value = "../index.html";
                linkcross.setAttributeNode(hrefattr);
                linkcross.appendChild(spanele);
                //console.log(linkcross)

                
                // ---------------------- //
                // Edit pencil

                linkedit = document.createElement('a');
                spanele = document.createElement('span');
                spanattr = document.createAttribute('class');
                spanattr.value = "glyphicon glyphicon-pencil";
                spanele.setAttributeNode(spanattr);

            

                hrefattr = document.createAttribute('href');
                hrefattr.value = "../index2.html";
                linkedit.setAttributeNode(hrefattr);
                linkedit.appendChild(spanele);
                //console.log(linkedit)



                // Each row
                tr = document.createElement('tr');
                th = document.createElement('th');
                td1 = document.createElement('td');
                td2 = document.createElement('td');
                td3 = document.createElement('td');
                td4 = document.createElement('td');
                td5 = document.createElement('td'); 

                //for cross
                td6 = document.createElement('td');

                //for pencil(edit)
                td7 = document.createElement('td');

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

                td6.appendChild(linkcross)
                td7.appendChild(linkedit)

                tr.appendChild(th);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);

                tr.appendChild(td7);
                tr.appendChild(td6);

                //console.log(tr);

                // Creates element as 
                // <tr>
                //    <th>96</th>
                //    <td>Gage Shelton</td>
                //    <td>Nunc.commodo@Classaptent.co.uk</td>
                //    <td>1631050442099</td><td>90048</td>
                //    <td>Owner</td>
                //    <td>
                //        <a href="../index2.html">
                //            <span class="glyphicon glyphicon-pencil">
                //            </span>
                //        </a>
                //    </td>
                //    <td>
                //        <a href="../index.html">
                //            <span class="glyphicon glyphicon-remove">
                //            </span>
                //        </a>
                //    </td>
                //</tr>




                document.getElementById('disp').appendChild(tr);


            }
        }
    };




}


// search member using cloud function API if member is present display it in the form and change the visibility to visible

smartSociety.prototype.searchMember = function(){

    var card = document.getElementsByName("searchField")[0].value;


    console.log(card);
    email = "";
    contact = "";
    name="";
    flatno="";


    if(card==="email"){
        email = document.getElementById("email").value;
    }

    if(card==="contact"){
        contact = document.getElementById("email").value;
    }
    if(card==="name"){
        name = document.getElementById("email").value;
    }    
    if(card==="flatno"){
        flatno = document.getElementById("email").value;
    }



    console.log(email,contact,name,flatno)
    console.log("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&email="+email+"&contact="+contact+"&flatno="+flatno+"&name="+name)

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&email="+email+"&contact="+contact+"&flatno="+flatno+"&name="+name,true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if ( this.readyState == 4 && this.status == 200){
            console.log(xhttp.responseText);

            const memberInfo = JSON.parse(xhttp.responseText).member;
            console.log(memberInfo)
            if(memberInfo!=null){
                var name = "";
                var email = "";
                var contact = "";
                var flatno = "";
                var type = "";
    
    
                for(var i in memberInfo){
                    name = memberInfo[i].name;
                    email = memberInfo[i].email;
                    contact = memberInfo[i].contact;
                    flatno = memberInfo[i].flatno;
                    type = memberInfo[i].type;
                }
    
    
                document.getElementById("name").value = name;
                document.getElementById("emailshown").value = email;
                document.getElementById("contact").value = contact;
                document.getElementById("flatno").value = flatno;
                document.getElementById("member_type").value = type;
    
                //Make changes to type addition UI
    
                //After successful search
    
                document.getElementById("displayBlock").style.visibility = "visible"
    
            }
            else{
                window.alert("Member not found")
            }
           

        }
    }





}


smartSociety.prototype.deleteMember = function(){

    var xhttpForSearch = new XMLHttpRequest();


    var card = document.getElementsByName("searchField")[0].value;
    
    if(card==="email"){
        var email = document.getElementById("email").value;
        xhttpForSearch.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&email="+email,true);
        
    }

    if(card==="contact"){
        var contact = document.getElementById("email").value;
        xhttpForSearch.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&contact="+contact,true);
        
    }

    if(card==="name"){
        var name = document.getElementById("email").value;
        xhttpForSearch.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&name="+name,true);
        
    }

    if(card==="flatno"){
        var flatno = document.getElementById("email").value;
        xhttpForSearch.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&flatno="+flatno,true);
        
    }
    
    xhttpForSearch.send();
    xhttpForSearch.onreadystatechange = function(){
         
        if ( this.readyState == 4 && this.status == 200){

            var key = "";

            const memberInfo = JSON.parse(xhttpForSearch.responseText).member;
            console.log(xhttpForSearch.responseText)
            console.log(memberInfo)
            for(var i in memberInfo){
                console.log(i)
                key=i;
            }

            console.log(key)


            //console.log("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/updateMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email+"&key="+key)
            var xhttp = new XMLHttpRequest();  
            xhttp.open("POST","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/deleteMember"+"?societyID=1"+"&key="+key,true);
            xhttp.send();
            xhttp.onreadystatechange = function(){
                if ( this.readyState == 4 && this.status == 200){
                    window.alert("Member Successfully updated");

                }
            }


        }
    }



}

smartSociety.prototype.updateMember = function(){
    

    var xhttpForSearch = new XMLHttpRequest();

    var card = document.getElementsByName("searchField")[0].value;
    
    if(card==="email"){
        var email = document.getElementById("email").value;
        xhttpForSearch.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&email="+email,true);
        
    }

    if(card==="contact"){
        var contact = document.getElementById("email").value;
        xhttpForSearch.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&contact="+contact,true);
        
    }

    if(card==="name"){
        var name = document.getElementById("email").value;
        xhttpForSearch.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&name="+name,true);
        
    }

    if(card==="flatno"){
        var flatno = document.getElementById("email").value;
        xhttpForSearch.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&flatno="+flatno,true);
        
    }
    xhttpForSearch.send();
    xhttpForSearch.onreadystatechange = function(){
         
        if ( this.readyState == 4 && this.status == 200){

            var key = "";

            const memberInfo = JSON.parse(xhttpForSearch.responseText).member;
            console.log(xhttpForSearch.responseText)
            console.log(memberInfo)
            if(memberInfo!=null){
                for(var i in memberInfo){
                    console.log(i)
                    key=i;
                }
    
                console.log(key)
    
    
    
                name =  document.getElementById("name").value 
                email = document.getElementById("emailshown").value;
                contact = document.getElementById("contact").value;
                flatno = document.getElementById("flatno").value ;
                type = document.getElementById("member_type").value;
    
                //console.log("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/updateMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email+"&key="+key)
                var xhttp = new XMLHttpRequest();  
                xhttp.open("POST","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/updateMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email+"&key="+key,true);
                xhttp.send();
                xhttp.onreadystatechange = function(){
                    if ( this.readyState == 4 && this.status == 200){
                        window.alert("Member Successfully updated");
    
                    }
                }
            }
            else{
                window.alert("member not found");
            }
            
        }
    }




}


window.onload = function(){
    window.smartSociety = new smartSociety();
};
